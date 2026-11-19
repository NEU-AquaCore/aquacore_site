"""Validate an entire static-site archive before extracting any of its files."""
from pathlib import Path, PurePosixPath
import hashlib
import json
import re
import shutil
import sys
import tarfile

MAX_BYTES = 2 * 1024 * 1024 * 1024
MAX_ENTRIES = 100000


def file_record(path):
    digest = hashlib.sha256()
    size = 0
    with open(path, "rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
            size += len(chunk)
    return {"sha256": digest.hexdigest(), "size": size}


def complete_site(destination, previous):
    destination = Path(destination).resolve()
    previous = Path(previous).resolve()
    with open(destination / "_asset-manifest.json", encoding="utf-8") as stream:
        manifest = json.load(stream)
    files = manifest.get("files")
    if manifest.get("version") != 1 or not isinstance(files, dict) or len(files) > MAX_ENTRIES:
        raise ValueError("Invalid site manifest")
    total = 0
    for name, record in files.items():
        path = PurePosixPath(name)
        if (path.is_absolute() or not path.parts or ".." in path.parts or "\\" in name
                or path.as_posix() != name or name == "_asset-manifest.json"):
            raise ValueError("Unsafe manifest path")
        if (not isinstance(record, dict) or not re.fullmatch(r"[0-9a-f]{64}", record.get("sha256", ""))
                or not isinstance(record.get("size"), int) or record["size"] < 0):
            raise ValueError("Invalid file checksum")
        total += record["size"]
    if total > MAX_BYTES:
        raise ValueError("Manifest exceeds the static-site size limit")
    extracted = {path.relative_to(destination).as_posix() for path in destination.rglob("*") if path.is_file()}
    if extracted - set(files) - {"_asset-manifest.json"}:
        raise ValueError("Archive contains files outside its manifest")
    for name, record in files.items():
        target = destination / name
        if not target.exists():
            source = previous / name
            if not source.is_file() or not source.resolve().is_relative_to(previous):
                raise ValueError("Required previous file is unavailable: " + name)
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(source, target)
        if not target.is_file() or target.is_symlink() or file_record(target) != record:
            raise ValueError("File does not match the deployment manifest: " + name)


def extract_site(archive_path, destination):
    destination = Path(destination).resolve()
    if not destination.is_dir() or any(destination.iterdir()):
        raise ValueError("The release destination must be an empty directory")
    with tarfile.open(archive_path, "r:gz") as archive:
        members = archive.getmembers()
        if len(members) > MAX_ENTRIES or sum(member.size for member in members) > MAX_BYTES:
            raise ValueError("Archive exceeds the static-site size limit")
        for member in members:
            path = PurePosixPath(member.name)
            if path.is_absolute() or ".." in path.parts or "\\" in member.name:
                raise ValueError("Unsafe archive path")
            if not (member.isfile() or member.isdir()):
                raise ValueError("Only regular files and directories are permitted")
            if not path.parts and not member.isdir():
                raise ValueError("A file must have a non-empty path")
            if member.mode & 0o6000:
                raise ValueError("Setuid and setgid permissions are not permitted")
        # Validated regular files and directories only; the destination is new and empty.
        options = {"filter": "data"} if hasattr(tarfile, "data_filter") else {}
        archive.extractall(destination, members=members, **options)


if __name__ == "__main__":
    if len(sys.argv) not in (3, 4):
        raise SystemExit("Usage: validate_archive.py archive.tar.gz empty-release-directory [previous-release]")
    extract_site(sys.argv[1], sys.argv[2])
    if len(sys.argv) == 4:
        complete_site(sys.argv[2], sys.argv[3])
