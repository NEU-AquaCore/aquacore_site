"""Create a complete checksum manifest and upload only changed static files."""
import json
from pathlib import Path
import sys
import tarfile
from validate_archive import file_record


def write_manifest(directory):
    directory = Path(directory).resolve()
    files = {}
    for path in sorted(directory.rglob("*")):
        if path.is_symlink():
            raise ValueError("Static-site symlinks are not supported")
        if path.is_file() and path != directory / "_asset-manifest.json":
            files[path.relative_to(directory).as_posix()] = file_record(path)
    manifest = {"version": 1, "files": files}
    (directory / "_asset-manifest.json").write_text(json.dumps(manifest, sort_keys=True, separators=(",", ":")) + "\n", encoding="utf-8")
    return manifest


def package_site(directory, previous_path, archive_path):
    directory = Path(directory).resolve()
    manifest = write_manifest(directory)
    try:
        previous = json.loads(Path(previous_path).read_text(encoding="utf-8"))
        previous_files = previous.get("files", {}) if previous.get("version") == 1 else {}
        if not isinstance(previous_files, dict):
            previous_files = {}
    except (OSError, ValueError):
        previous_files = {}
    changed = [name for name, record in manifest["files"].items() if previous_files.get(name) != record]
    with tarfile.open(archive_path, "w:gz") as archive:
        for name in changed + ["_asset-manifest.json"]:
            archive.add(directory / name, arcname=name, recursive=False)
    print(f"Changed files: {len(changed)} of {len(manifest['files'])}; upload: {Path(archive_path).stat().st_size:,} bytes")
    return changed


if __name__ == "__main__":
    if len(sys.argv) == 3 and sys.argv[1] == "manifest":
        write_manifest(sys.argv[2])
    elif len(sys.argv) == 5 and sys.argv[1] == "package":
        package_site(sys.argv[2], sys.argv[3], sys.argv[4])
    else:
        raise SystemExit("Usage: prepare_release.py manifest site-directory | package site-directory previous-manifest archive.tar.gz")
