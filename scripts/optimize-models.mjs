import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, unlinkSync, rmdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const cli = path.join(root, 'node_modules/@gltf-transform/cli/bin/cli.js');
const temporaryDir = mkdtempSync(path.join(tmpdir(), 'aquacore-models-'));
mkdirSync(path.join(root, 'public/models'), { recursive: true });

try {
  for (const [source, name] of [['clutch4.glb', 'clutch'], ['challenge.glb', 'challenge']]) {
    const instanced = path.join(temporaryDir, `${name}.glb`);
    try {
      // Reuse identical static parts on the GPU without duplicating geometry.
      execFileSync(process.execPath, [cli, 'instance', path.join(root, 'public', source), instanced, '--min', '2'], { stdio: 'inherit' });
      execFileSync(process.execPath, [cli, 'draco', instanced, path.join(root, `public/models/${name}-draco.glb`),
        '--quantize-position', '16', '--quantize-normal', '12', '--decode-speed', '8'], { stdio: 'inherit' });
    } finally {
      try { unlinkSync(instanced); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    }
  }
} finally {
  rmdirSync(temporaryDir);
}
