import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

// Keep original dimensions and source files. Only production URLs change.
export function optimizedImages() {
  const images = new Map();
  let publicDir;
  let base;
  let savedBytes = 0;

  return {
    name: 'aquacore-optimized-images',
    apply: 'build',
    enforce: 'pre',
    configResolved(config) {
      publicDir = config.publicDir;
      base = config.base;
    },
    async transform(code, id) {
      if (!/\.[jt]sx?$/.test(id) || id.includes('/node_modules/')) return;
      const urls = [...new Set(code.match(/\/(?:images|website_member_photos|competition\/images)\/[^"'`\s)\\]+?\.(?:png|jpe?g|webp)\b/gi) || [])];
      if (!urls.length) return;

      const replacements = await Promise.all(urls.map(async url => {
        if (!images.has(url)) {
          images.set(url, (async () => {
            let source;
            try {
              source = await readFile(path.join(publicDir, url.slice(1)));
            } catch (error) {
              if (error.code === 'ENOENT') return url;
              throw error;
            }
            const image = sharp(source);
            const metadata = await image.metadata();
            if (metadata.pages > 1) return url;
            const optimized = await image.rotate().webp({
              quality: 85,
              alphaQuality: 100,
              effort: 4,
              lossless: url.includes('/logos/'),
            }).toBuffer();
            if (optimized.length >= source.length) return url;
            const hash = createHash('sha256').update(optimized).digest('hex').slice(0, 12);
            const name = path.posix.basename(url, path.posix.extname(url));
            const fileName = `assets/images/${name}-${hash}.webp`;
            this.emitFile({ type: 'asset', fileName, source: optimized });
            savedBytes += source.length - optimized.length;
            return `${base}${fileName}`;
          })());
        }
        return [url, await images.get(url)];
      }));

      for (const [url, optimizedUrl] of replacements) {
        code = code.split(url).join(optimizedUrl);
      }
      return { code, map: null };
    },
    generateBundle() {
      this.info(`Optimized images save ${(savedBytes / 1024 / 1024).toFixed(2)} MiB; original dimensions preserved.`);
    },
  };
}
