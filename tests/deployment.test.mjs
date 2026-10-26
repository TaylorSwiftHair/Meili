import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {validate} from '../scripts/validate-site.mjs';
import {projectSourceUrl} from '../site/deployment.js';
const originals=JSON.parse(fs.readFileSync(new URL('./deployment-originals.json',import.meta.url)));
const normalize=text=>text.replace(/^import \{projectSourceUrl\} from '\.\/deployment.js';\n/,'').replace('href="${projectSourceUrl()}" download>Project source & setup ↗','href="/downloads/meili-source.zip" download>Download project & training tools ↗').replace("ort.env.wasm.wasmPaths=new URL('./vendor/',import.meta.url).href","ort.env.wasm.wasmPaths='/vendor/'").replace(/(["'])\.\/(assets\/|vendor\/|visual-model\/|catalog\.json|makeup-tutorials\.json|hair-tutorials\.json|manifest\.webmanifest|style\.css|design\.css|app\.js)/g,'$1/$2');
test('hosting export preserves every original artwork/model byte and all runtime logic beyond documented URL changes',()=>{
 for(const [file,hash]of Object.entries(originals)){
  const bytes=fs.readFileSync(new URL('../site/'+file,import.meta.url));
  if(file==='manifest.webmanifest'){const m=JSON.parse(bytes);assert.equal(m.start_url,'./');assert.equal(m.scope,'./');continue}
  const content=/\.(js|css|json|html|svg)$/.test(file)&&!file.startsWith('vendor/')?Buffer.from(normalize(bytes.toString())):bytes;
  assert.equal(createHash('sha256').update(content).digest('hex'),hash,file);
 }
});
test('production input has valid public paths, complete verified model and browser-uploadable files',async()=>{
 const report=await validate(fileURLToPath(new URL('../site/',import.meta.url)));assert.equal(report.labels,12);assert.equal(report.modelBytes,89117001);
});
test('source archive URL follows the GitHub account and repository, including user-site roots',()=>{
 assert.equal(projectSourceUrl(new URL('https://someone.github.io/Any-Repo/')),'https://github.com/someone/Any-Repo/archive/refs/heads/main.zip');
 assert.equal(projectSourceUrl(new URL('https://someone.github.io/')),'https://github.com/someone/someone.github.io/archive/refs/heads/main.zip');
 assert.equal(projectSourceUrl(new URL('https://example.com/meili/')),'https://example.com/meili/README.md');
});
