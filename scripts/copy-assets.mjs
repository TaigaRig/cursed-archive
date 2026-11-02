import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const source = resolve('assets');
const target = resolve('dist/assets');
if (!existsSync(source)) throw new Error('The original archive assets directory is missing.');
mkdirSync(resolve('dist'), { recursive: true });
cpSync(source, target, { recursive: true });
console.log('Copied original archive artwork into dist/assets');