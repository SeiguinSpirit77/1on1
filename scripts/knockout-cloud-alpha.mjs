#!/usr/bin/env node
/**
 * Usuwa czarne tło z PNG chmury → prawdziwa przezroczystość (RGBA).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const INPUT = path.join(ROOT, 'src/assets/images/section-cloud-divider.png');
const OUTPUT = path.join(ROOT, 'src/assets/images/section-cloud-divider-alpha.png');

const BLACK_THRESHOLD = 42;
const SOFT_EDGE = 28;

async function main() {
  if (!fs.existsSync(INPUT)) {
    console.error('Brak pliku:', INPUT);
    process.exit(1);
  }

  const { data, info } = await sharp(INPUT).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    if (lum <= BLACK_THRESHOLD) {
      data[i + 3] = 0;
    } else if (lum < BLACK_THRESHOLD + SOFT_EDGE) {
      const t = (lum - BLACK_THRESHOLD) / SOFT_EDGE;
      data[i + 3] = Math.round(Math.min(255, data[i + 3]) * t);
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(OUTPUT);

  console.log('Zapisano:', OUTPUT, `(${info.width}x${info.height})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
