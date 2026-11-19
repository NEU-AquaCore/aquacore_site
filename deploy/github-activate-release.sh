#!/usr/bin/env bash
set -euo pipefail
test "$(id -u)" = 0
test "$#" = 1
release_id="$1"
[[ "$release_id" =~ ^[0-9]{8}T[0-9]{6}Z-[0-9a-f]{12}$ ]] || exit 2
release="/var/www/aquacore/releases/$release_id"
# The caller can create releases, but cannot redirect root through a symlink.
test ! -L "$release"
test "$(readlink -f "$release")" = "$release"
test -f "$release/index.html"
test ! -L "$release/index.html"
exec /usr/local/libexec/aquacore/activate-release.sh "$release_id"
