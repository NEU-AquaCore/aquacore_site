#!/usr/bin/env bash
set -euo pipefail

release_id="${1:?Usage: activate-release.sh release-id}"
[[ "$release_id" =~ ^[A-Za-z0-9_-]+$ ]] || exit 2
site_root=/var/www/aquacore
release="$site_root/releases/$release_id"
test -s "$release/index.html"
nginx -t

previous=''
if [ -L "$site_root/current" ] && [ -s "$site_root/current/index.html" ]; then
    previous="$(readlink -f "$site_root/current")"
fi
# Retain previous hashed chunks for browsers that still have an older HTML page.
if [ -n "$previous" ] && [ -d "$previous/assets" ] && [ "$previous" != "$release" ]; then
    mkdir -p "$release/assets"
    cp -an "$previous/assets/." "$release/assets/"
fi
chmod -R a+rX "$release"
ln -s "$release" "$site_root/current-next"
mv -Tf "$site_root/current-next" "$site_root/current"

rollback() {
    if [ -n "$previous" ] && [ -d "$previous" ]; then
        ln -s "$previous" "$site_root/current-next"
        mv -Tf "$site_root/current-next" "$site_root/current"
        echo "Restored $previous" >&2
    else
        # First deployment has no previous version; remove only this symlink.
        unlink "$site_root/current"
    fi
}
trap rollback ERR
# Check served content, not just a static health endpoint.
check_origin=http://aquacore.org.cn
resolve='aquacore.org.cn:80:127.0.0.1'
if [ -f /etc/letsencrypt/live/aquacore.org.cn/fullchain.pem ]; then
    check_origin=https://aquacore.org.cn
    resolve='aquacore.org.cn:443:127.0.0.1'
fi
curl --max-time 15 --fail --silent --show-error --resolve "$resolve" "$check_origin/index.html" | cmp -s - "$release/index.html"
curl --max-time 15 --fail --silent --show-error --resolve "$resolve" "$check_origin/team" | cmp -s - "$release/index.html"
trap - ERR
if [ -n "$previous" ] && [ "$previous" != "$release" ]; then
    ln -sfn "$previous" "$site_root/previous"
fi
echo "Active release: $release_id"
