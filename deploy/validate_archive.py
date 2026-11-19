"""Validate an entire static-site archive before extracting any of its files."""
from pathlib import Path, PurePosixPath
import sys
import tarfile

MAX_BYTES = 2 * 1024 * 1024 * 1024
MAX_ENTRIES = 100000


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
    if len(sys.argv) != 3:
        raise SystemExit("Usage: validate_archive.py archive.tar.gz empty-release-directory")
    extract_site(sys.argv[1], sys.argv[2])
