import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filesToCopy = ['index.html', 'style.css', 'script.js'];
const targetDirs = ['dist', 'public'];

for (const dir of targetDirs) {
  const targetPath = path.join(__dirname, dir);
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  for (const file of filesToCopy) {
    const srcFile = path.join(__dirname, file);
    if (fs.existsSync(srcFile)) {
      fs.copyFileSync(srcFile, path.join(targetPath, file));
    }
  }
}

console.log('Build completed successfully: populated dist/ and public/ with static assets.');
