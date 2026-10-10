import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const ARCHIVE_DIR = join(process.cwd(), 'public', 'images', 'gallery', 'archive');
const THUMBS_DIR = join(process.cwd(), 'public', 'images', 'gallery', 'archive_thumbs');
const THUMB_WIDTH = 640;
const THUMB_QUALITY = 72;

const force = process.argv.includes('--force');

async function main() {
  if (!existsSync(ARCHIVE_DIR)) {
    console.error(`❌ Archive folder not found: ${ARCHIVE_DIR}`);
    process.exit(1);
  }

  mkdirSync(THUMBS_DIR, { recursive: true });

  const sources = readdirSync(ARCHIVE_DIR).filter((file) => /\.jpe?g$/i.test(file));
  console.log(`Generating thumbnails for ${sources.length} images...`);

  let generated = 0;
  let skipped = 0;

  for (const file of sources) {
    const outName = `${parse(file).name}.webp`;
    const outPath = join(THUMBS_DIR, outName);

    if (!force && existsSync(outPath)) {
      skipped++;
      continue;
    }

    await sharp(join(ARCHIVE_DIR, file))
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .webp({ quality: THUMB_QUALITY })
      .toFile(outPath);

    generated++;
  }

  console.log(`\n✅ Done — generated ${generated}, skipped ${skipped}`);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});