#!/usr/bin/env bash
set -euo pipefail
test "$(id -u)" = 0
source_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
public_key_file="${1:?Usage: configure-github-deploy.sh public-key-file}"
public_key="$(awk '{print $1 " " $2}' "$public_key_file")"
[[ "$public_key" =~ ^ssh-ed25519\ [A-Za-z0-9+/=]+$ ]] || exit 2

if ! id aquacore-deploy >/dev/null 2>&1; then
    useradd --system --create-home --home-dir /var/lib/aquacore-deploy --shell /bin/bash aquacore-deploy
fi
install -d -m 755 /usr/local/libexec/aquacore
install -m 755 "$source_dir/github-receive-release.sh" /usr/local/libexec/aquacore/github-receive-release.sh
install -m 755 "$source_dir/activate-release.sh" /usr/local/libexec/aquacore/activate-release.sh
install -m 644 "$source_dir/validate_archive.py" /usr/local/libexec/aquacore/validate_archive.py
install -m 644 "$source_dir/prepare_release.py" /usr/local/libexec/aquacore/prepare_release.py
install -m 755 "$source_dir/github-activate-release.sh" /usr/local/sbin/aquacore-activate-release

install -d -m 755 -o aquacore-deploy -g aquacore-deploy /var/www/aquacore/releases
install -d -m 700 -o aquacore-deploy -g aquacore-deploy /var/lib/aquacore-deploy/.ssh
authorized=/var/lib/aquacore-deploy/.ssh/authorized_keys
touch "$authorized"
if ! grep -Fq "$public_key" "$authorized"; then
    printf 'restrict,command="/usr/local/libexec/aquacore/github-receive-release.sh" %s\n' "$public_key" >> "$authorized"
fi
chown aquacore-deploy:aquacore-deploy "$authorized"
chmod 600 "$authorized"
printf 'aquacore-deploy ALL=(root) NOPASSWD: /usr/local/sbin/aquacore-activate-release\n' > /etc/sudoers.d/aquacore-deploy
chmod 440 /etc/sudoers.d/aquacore-deploy
visudo -cf /etc/sudoers.d/aquacore-deploy
echo 'Restricted GitHub deployment account is ready.'
