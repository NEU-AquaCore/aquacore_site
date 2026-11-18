#!/usr/bin/env bash
set -euo pipefail

if [ "$(id -u)" -ne 0 ]; then
    echo 'Run with root (or sudo bash).' >&2
    exit 1
fi

source_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
export DEBIAN_FRONTEND=noninteractive
if ! command -v nginx >/dev/null || ! command -v certbot >/dev/null; then
    apt-get update
    apt-get install -y nginx certbot python3-certbot-nginx curl
fi

install -d -m 755 /var/www/aquacore/releases /var/www/letsencrypt /etc/nginx/snippets
install -m 644 "$source_dir/security.conf" /etc/nginx/snippets/aquacore-security.conf
# Preserve Certbot's HTTPS edits on later deployments.
if [ ! -f /etc/nginx/sites-available/aquacore ]; then
    install -m 644 "$source_dir/nginx.conf" /etc/nginx/sites-available/aquacore
fi
ln -sfn /etc/nginx/sites-available/aquacore /etc/nginx/sites-enabled/aquacore
nginx -t
systemctl enable --now nginx
systemctl reload nginx
echo 'Nginx is ready. Allow TCP 80/443 in the cloud security group.'
