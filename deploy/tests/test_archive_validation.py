import importlib.util
import io
from pathlib import Path
import tarfile
import tempfile
import unittest

spec = importlib.util.spec_from_file_location("validate_archive", Path(__file__).resolve().parents[1] / "validate_archive.py")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class ArchiveValidationTests(unittest.TestCase):
    def write_archive(self, archive_path, name, kind=tarfile.REGTYPE, mode=0o644):
        with tarfile.open(archive_path, "w:gz") as archive:
            valid = tarfile.TarInfo("index.html")
            valid.size = 2
            archive.addfile(valid, io.BytesIO(b"ok"))
            item = tarfile.TarInfo(name)
            item.type = kind
            item.mode = mode
            if kind in (tarfile.SYMTYPE, tarfile.LNKTYPE):
                item.linkname = "/etc/passwd"
            item.size = 2 if kind == tarfile.REGTYPE else 0
            archive.addfile(item, io.BytesIO(b"ok") if item.size else None)

    def test_valid_site_extracts(self):
        with tempfile.TemporaryDirectory() as temporary:
            directory = Path(temporary)
            destination = directory / "release"
            destination.mkdir()
            archive = directory / "site.tar.gz"
            self.write_archive(archive, "./assets/海洋之心.js")
            module.extract_site(archive, destination)
            self.assertEqual((destination / "index.html").read_text(), "ok")
            self.assertEqual((destination / "assets/海洋之心.js").read_text(), "ok")

    def test_unsafe_members_reject_entire_archive(self):
        for name, kind, mode in [
            ("../outside", tarfile.REGTYPE, 0o644),
            ("/etc/passwd", tarfile.REGTYPE, 0o644),
            ("assets/link", tarfile.SYMTYPE, 0o644),
            ("assets/hardlink", tarfile.LNKTYPE, 0o644),
            ("assets/fifo", tarfile.FIFOTYPE, 0o644),
            ("assets/setuid", tarfile.REGTYPE, 0o4755),
        ]:
            with self.subTest(name=name), tempfile.TemporaryDirectory() as temporary:
                directory = Path(temporary)
                destination = directory / "release"
                destination.mkdir()
                archive = directory / "site.tar.gz"
                self.write_archive(archive, name, kind, mode)
                with self.assertRaises(ValueError):
                    module.extract_site(archive, destination)
                self.assertEqual(list(destination.iterdir()), [])

    def test_existing_release_is_never_overwritten(self):
        with tempfile.TemporaryDirectory() as temporary:
            directory = Path(temporary)
            destination = directory / "release"
            destination.mkdir()
            (destination / "index.html").write_text("previous")
            archive = directory / "site.tar.gz"
            self.write_archive(archive, "assets/new.js")
            with self.assertRaises(ValueError):
                module.extract_site(archive, destination)
            self.assertEqual((destination / "index.html").read_text(), "previous")
