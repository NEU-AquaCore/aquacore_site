# 性能优化记录

本次保留页面的 DOM 布局、样式类、模型比例、相机路径和光照。原始图片、模型文件也保留在仓库中。

## 本地生产构建对比

2026-10-20，使用本机 Chrome、1440 × 900 视口、独立浏览器上下文访问 Vite 生产预览。资源量是 Resource Timing 的 decodedBodySize 总和，单位为十进制 MB，包含提前加载的图片，不等同于公网传输压缩后的流量或首屏耗时。

| 项目 | 优化前 | 优化后 |
| --- | ---: | ---: |
| 首页加载资源 | 72.05 MB | 2.59 MB |
| 首页 JavaScript（压缩后文件体积，未 gzip） | 1,544 KB | 248 KB |
| 首页额外模型下载 | 6 个 | 0 个 |
| Vehicles 初次加载资源 | 65.67 MB | 1.97 MB |
| Clutch 详情页加载资源 | 62.64 MB | 2.07 MB |
| Challenge 详情页加载资源 | 62.64 MB | 2.93 MB |
| Clutch 模型文件 | 3.06 MB | 0.38 MB |
| Challenge 模型文件 | 9.93 MB | 1.25 MB |
| Clutch 模型每帧绘制批次 | 71 | 22 |
| Challenge 模型每帧绘制批次 | 349 | 93 |

桌面主要页面和手机首页的页面高度、标题及区块尺寸保持一致。模型形状未做简化；Draco 使用 16 位位置量化和 12 位法线量化。浏览器测试使用软件 WebGL 验证绘制与交互，不用于推断真实手机的 FPS。

已通过干净安装依赖和生产构建，新增及重写组件的 ESLint 检查也通过（Three.js JSX 关闭 DOM 属性检查）。浏览器验证覆盖桌面鼠标、手机触屏旋转两个模型、阻尼停止后的零绘制、离屏暂停、两个详情页的滚动相机、前进返回导航和无 WebGL 图片回退。Contact 页的第三方地图未做公网功能验证。

## 实现

- 页面和各个模型独立按需加载，关闭路由的 import 不再触发模型预取。
- Vehicles 的 3D 模块在容器接近视口时才加载；离开视口或切到后台时停止绘制。
- 详情页按需渲染，GSAP 更新相机时主动请求绘制，离开页面时清理时间线和 ScrollTrigger。
- 模型的重复零件使用 GPU instancing；保留原始网格，通过本地 Draco 解码器加载。
- 旋转阻尼根据帧间隔计算，避免低帧率设备上的惯性持续过久。触屏和鼠标共用 OrbitControls。
- 生产构建自动生成带内容哈希的 WebP，保持公开图片的显示比例和尺寸、EXIF 方向以及透明度。开发环境继续使用原图。
- 导航及页脚使用较小的 Logo，favicon 单独缩小；首屏图片优先加载，其他图片延迟加载。
- 屏幕外及后台的轮播、赞助商动画暂停；视频只预载必要的元数据以保留布局。
- 移除当前 Cloudflare 部署中返回 404 的 Vercel Speed Insights 脚本。

## 构建与部署

```powershell
npm ci
npm run build
```

将生成的 `dist` 目录按原流程重新部署到 Cloudflare Workers。`public/_headers` 会复制到产物：带哈希的 `/assets/*` 使用一年缓存，稳定 URL 的模型和 Draco 解码器使用较短缓存。HTML 沿用平台的重新验证行为。配置格式见 [Cloudflare Workers Static Assets 文档](https://developers.cloudflare.com/workers/static-assets/headers/)。

替换原始模型后，先运行以下命令，再构建：

```powershell
npm run optimize:models
```

该命令从 `clutch4.glb` 和 `challenge.glb` 重新生成 `public/models` 中的优化版。生产构建仍有一个约 830 KB 的 Three.js 依赖块，它只在打开 3D 查看器时下载。

本次完成本地修改与构建，线上版本需要重新部署后才会生效。公网实际加载时间和生产缓存命中率尚未验证。
