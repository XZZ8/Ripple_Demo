import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const exportRoot = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(exportRoot, '..');
const distRoot = path.join(exportRoot, 'dist');
const assetsRoot = path.join(distRoot, 'assets');

const assetFiles = await readdir(assetsRoot);
const scriptFile = assetFiles.find((file) => file.endsWith('.js'));
const styleFile = assetFiles.find((file) => file.endsWith('.css'));

if (!scriptFile || !styleFile) {
  throw new Error('Standalone build did not produce one JavaScript and one CSS asset.');
}

let html = await readFile(path.join(distRoot, 'index.html'), 'utf8');
let script = await readFile(path.join(assetsRoot, scriptFile), 'utf8');
const style = await readFile(path.join(assetsRoot, styleFile), 'utf8');

const posterRoot = path.join(projectRoot, 'public', 'posters');
for (const file of await readdir(posterRoot)) {
  if (!file.endsWith('.png')) continue;
  const bytes = await readFile(path.join(posterRoot, file));
  const dataUrl = `data:image/png;base64,${bytes.toString('base64')}`;
  script = script.replaceAll(`/posters/${file}`, dataUrl);
}

html = html
  .replace(
    /<script[^>]+src="\.\/assets\/[^"]+\.js"[^>]*><\/script>/,
    () => `<script type="module">${script.replaceAll('</script', '<\\/script')}</script>`,
  )
  .replace(
    /<link[^>]+href="\.\/assets\/[^"]+\.css"[^>]*>/,
    () => `<style>${style.replaceAll('</style', '<\\/style')}</style>`,
  );

if (/\.\/assets\//.test(html)) {
  throw new Error('The exported HTML still contains unresolved bundle assets.');
}
if (/\/posters\//.test(html)) {
  throw new Error('The exported HTML still contains unresolved poster assets.');
}

const outputPath = path.join(projectRoot, 'Ripple_Demo_Standalone.html');
await writeFile(outputPath, html);
console.log(outputPath);
