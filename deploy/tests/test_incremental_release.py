import json
from pathlib import Path
import sys
import tarfile
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from prepare_release import package_site, write_manifest
from validate_archive import complete_site, extract_site


class IncrementalReleaseTests(unittest.TestCase):
    def fixture(self, directory):
        previous = directory / "previous"
        site = directory / "site"
        release = directory / "release"
        for path in (previous, site, release):
            path.mkdir()
        for path in (previous, site):
            (path / "index.html").write_text("old")
            (path / "model.glb").write_bytes(b"unchanged large model")
        (previous / "deleted.txt").write_text("obsolete")
        write_manifest(previous)
        (site / "index.html").write_text("new")
        (site / "new.css").write_text("body {}")
        archive = directory / "patch.tar.gz"
        package_site(site, previous / "_asset-manifest.json", archive)
        return previous, site, release, archive

    def test_unchanged_assets_are_not_uploaded_and_deleted_files_stay_removed(self):
        with tempfile.TemporaryDirectory() as temporary:
            previous, site, release, archive = self.fixture(Path(temporary))
            with tarfile.open(archive) as package:
                self.assertNotIn("model.glb", package.getnames())
                self.assertIn("index.html", package.getnames())
            extract_site(archive, release)
            complete_site(release, previous)
            self.assertEqual((release / "index.html").read_text(), "new")
            self.assertEqual((release / "model.glb").read_bytes(), (site / "model.glb").read_bytes())
            self.assertFalse((release / "deleted.txt").exists())

    def test_changed_server_asset_is_detected_before_activation(self):
        with tempfile.TemporaryDirectory() as temporary:
            previous, _, release, archive = self.fixture(Path(temporary))
            (previous / "model.glb").write_bytes(b"server changed after manifest download")
            extract_site(archive, release)
            with self.assertRaises(ValueError):
                complete_site(release, previous)

    def test_manifest_cannot_copy_files_outside_the_previous_site(self):
        with tempfile.TemporaryDirectory() as temporary:
            previous, _, release, archive = self.fixture(Path(temporary))
            extract_site(archive, release)
            manifest_path = release / "_asset-manifest.json"
            manifest = json.loads(manifest_path.read_text())
            manifest["files"]["../private"] = manifest["files"].pop("model.glb")
            manifest_path.write_text(json.dumps(manifest))
            with self.assertRaises(ValueError):
                complete_site(release, previous)
