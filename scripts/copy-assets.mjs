import { readdirSync, mkdirSync, copyFileSync } from 'node:fs';
import { resolve, extname, basename, join } from 'node:path';
import sharp from 'sharp';

const source = resolve('assets');
const target = resolve('dist/assets');
mkdirSync(target, { recursive: true });

const imageFiles = readdirSync(source).filter(file => /\.(png|jpe?g|webp)$/i.test(file));
for (const file of imageFiles) {
  const input = join(source, file);
  const output = join(target, basename(file, extname(file)) + '.webp');
  await sharp(input)
    .rotate()
    .resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(output);
}
for (const file of ['season2.html', 'domain-expansion.html']) {
  copyFileSync(resolve(file), resolve('dist', file));
}
console.log('Optimized ' + imageFiles.length + ' archive images and copied legacy route redirects.');
