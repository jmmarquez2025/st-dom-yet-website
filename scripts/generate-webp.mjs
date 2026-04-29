import { readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, parse } from "node:path";
import sharp from "sharp";

const PHOTO_DIR = "public/photos";

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else if (entry.isFile() && /\.(jpe?g)$/i.test(entry.name)) {
      yield fullPath;
    }
  }
}

async function needsUpdate(source, target) {
  if (!existsSync(target)) return true;
  const [sourceStat, targetStat] = await Promise.all([stat(source), stat(target)]);
  return sourceStat.mtimeMs > targetStat.mtimeMs;
}

let count = 0;
console.log("Generating WebP images...");

for await (const jpg of walk(PHOTO_DIR)) {
  const { dir, name } = parse(jpg);
  const webp = join(dir, `${name}.webp`);
  if (!(await needsUpdate(jpg, webp))) continue;

  await sharp(jpg).webp({ quality: 80 }).toFile(webp);
  count += 1;
  console.log(`  Created: ${webp}`);
}

console.log(`Done! ${count} WebP image${count === 1 ? "" : "s"} generated.`);
