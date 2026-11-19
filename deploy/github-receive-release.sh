#!/usr/bin/env bash
set -euo pipefail
umask 077

# This account's SSH key is restricted to this command and cannot open a shell.
if [[ "${SSH_ORIGINAL_COMMAND:-}" =~ ^deploy\ ([0-9a-f]{40})\ ([0-9a-f]{64})$ ]]; then
    commit="${BASH_REMATCH[1]}"
    digest="${BASH_REMATCH[2]}"
else
    echo 'Only a verified static-site deployment is accepted.' >&2
    exit 2
fi

exec 9>/var/lib/aquacore-deploy/deploy.lock
flock -w 1200 9
stage="$(mktemp -d /var/lib/aquacore-deploy/upload-XXXXXXXX)"
trap 'rm -f "$stage/site.tar.gz"; rmdir "$stage"' EXIT
cat > "$stage/site.tar.gz"
printf '%s  %s\n' "$digest" "$stage/site.tar.gz" | sha256sum -c -

release_id="$(date -u +%Y%m%dT%H%M%SZ)-${commit:0:12}"
release="/var/www/aquacore/releases/$release_id"
mkdir "$release"
python3 /usr/local/libexec/aquacore/validate_archive.py "$stage/site.tar.gz" "$release" /var/www/aquacore/current
python3 - "$release/_deployment.json" "$commit" <<'PY'
import json
import sys
with open(sys.argv[1]) as manifest:
    data = json.load(manifest)
if data.get("commit") != sys.argv[2] or data.get("repository") != "NEU-AquaCore/aquacore_site":
    raise SystemExit("Deployment metadata does not match the requested revision")
PY
sudo -n /usr/local/sbin/aquacore-activate-release "$release_id"
