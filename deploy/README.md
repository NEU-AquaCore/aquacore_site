# AquaCore 独立服务器部署

目标服务器：`root@<server-ip>`，域名：`aquacore.org.cn`、`www.aquacore.org.cn`。
使用当前工作区构建后的 React/Vite 页面；服务器只运行 Nginx，不依赖 Cloudflare Workers，也不需要常驻 Node.js。

## 首次部署

1. 将本机公钥加入服务器 `/root/.ssh/authorized_keys`，并核实 SSH 主机指纹。
   默认私钥路径：`$env:USERPROFILE\.ssh\aquacore_deploy_ed25519`。私钥保留在本机，不放进项目或 Git。
2. 在阿里云轻量服务器防火墙中放行 TCP 80 和 443，保留 SSH 22。
3. 在项目目录运行，将 `YOUR_SERVER_IP` 替换为目标服务器 IP。

   ```powershell
   npm run deploy:server -- -Server YOUR_SERVER_IP
   ```

   脚本会先检查 SSH，再构建、打包、校验 SHA-256、安装站点配置并原子切换版本。
   自定义密钥/端口：

   ```powershell
   .\scripts\deploy-server.ps1 -Server YOUR_SERVER_IP -IdentityFile C:\path\key -Port 22
   ```

4. 配置域名解析。保留邮件、TXT 等无关记录；如果已有同名 A/AAAA/CNAME，先确认并消除冲突。

   | 主机记录 | 类型 | 记录值 |
   | --- | --- | --- |
   | `@` | A | `<server-ip>` |
   | `www` | A | `<server-ip>` |

   中国大陆服务器的域名正式上线需完成 ICP 备案和相应接入。域名实名认证与 ICP 备案是两件事。

5. 两个域名从公网均能正确访问服务器后，在服务器申请证书。将邮箱替换为已确认的运维邮箱；申请人自行阅读并接受证书服务条款：

   ```bash
   certbot --nginx -d aquacore.org.cn -d www.aquacore.org.cn --redirect --email YOUR_EMAIL
   systemctl enable --now certbot.timer
   certbot renew --dry-run
   ```

## 更新与回滚

### GitHub 自动同步

生产发布源是 `NEU-AquaCore/aquacore_site` 的 `main` 分支。每次推送后，GitHub Actions 自动安装锁定依赖、验证部署包处理、构建网站并发布到现有服务器；也可以在 Actions 中手动运行 **Deploy AquaCore website**。

工作流：`.github/workflows/deploy-site.yml`。发布使用专用 `aquacore-deploy` SSH 账户，密钥只能执行静态网站上传，不能打开服务器 shell；服务器收到部署数据后校验 SHA-256、路径和版本信息，再原子切换站点。自检失败自动恢复旧版本。现有 HTTPS 和域名配置继续使用。

发布采用增量传输：构建时比较线上 `_asset-manifest.json` 中的 SHA-256，只上传发生变化的文件。服务器为新版本复制未变化的资源，再按完整清单校验每个文件；因此原有大型模型和视频不需要重复上传。上线清单不包含删除的普通文件，旧版本的哈希资源仍保留供已打开的页面使用。

仓库需要以下 Actions Secrets：

| Secret | 内容 |
| --- | --- |
| `AQUACORE_DEPLOY_HOST` | 网站服务器 IP 或 SSH 主机名 |
| `AQUACORE_DEPLOY_USER` | `aquacore-deploy` |
| `AQUACORE_DEPLOY_PORT` | SSH 端口 |
| `AQUACORE_DEPLOY_SSH_KEY` | 专用部署私钥，不提交到 Git |
| `AQUACORE_DEPLOY_KNOWN_HOSTS` | 事先核实过的服务器 SSH 主机公钥 |

管理员首次在服务器执行 `bash deploy/configure-github-deploy.sh /path/to/deploy-key.pub` 安装受限账户与发布脚本。服务器端的管理员脚本不随普通页面推送自动替换；修改这些脚本时由管理员重新安装。

上线后 `https://aquacore.org.cn/_deployment.json` 给出当前 GitHub commit，Actions 会核对它与本次推送一致。GitHub 的部署日志可查看构建、上传和公开站点验证结果。

### 本地手动发布

后续更新仍执行 `npm run deploy:server -- -Server YOUR_SERVER_IP`。脚本保留已有 HTTPS 配置，并为仍打开旧页面的访客保留旧哈希资源。
页面和未带版本号的模型、游戏资源每次重新验证缓存；Vite 哈希资源长期缓存。React 路由可直接打开或刷新，缺失静态资源返回 404。

目录结构：

```text
/var/www/aquacore/releases/<UTC-time>-<random-id>/
/var/www/aquacore/current   -> 当前版本
/var/www/aquacore/previous  -> 上一个版本
/etc/nginx/sites-available/aquacore
/var/log/nginx/aquacore.access.log
/var/log/nginx/aquacore.error.log
```

如果发布自检失败，脚本自动恢复旧版本。手动回滚：

```bash
cd /var/www/aquacore
test -s previous/index.html
ln -s "$(readlink -f previous)" rollback-next
mv -Tf rollback-next current
```

不自动清理历史版本；定期查看 `du -sh /var/www/aquacore/releases/*`，按实际需要保留。
部署临时目录位于服务器 `/tmp/aquacore-*`；成功后删除其中的上传包，保留少量部署脚本供排障。

## 检查

```bash
nginx -t
systemctl status nginx --no-pager
curl -I https://aquacore.org.cn/
curl -I https://aquacore.org.cn/team
curl -I https://aquacore.org.cn/gamefiles/index.html
systemctl list-timers certbot.timer
```

项目中的联系表单原本已标注“暂未开放”，仓库未提供 `/api/contact` 服务；本次迁移不新增邮件后端。
