import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
export async function walk(root){let out=[];for(const d of await fs.readdir(root,{withFileTypes:true})){const p=path.join(root,d.name);if(d.isSymbolicLink())throw Error('Symlinks are not allowed: '+p);if(d.isDirectory())out.push(...await walk(p));else out.push(p)}return out;}
export async function validate(root){
 const files=await walk(root),missing=[];
 for(const file of files){
  const stat=await fs.stat(file);if(stat.size>25*1024*1024)throw Error('File exceeds GitHub browser upload limit: '+file);
  if(file.includes(path.sep+'vendor'+path.sep)||! /\.(?:js|css|html|json|webmanifest|svg)$/.test(file))continue;
  const text=await fs.readFile(file,'utf8');
  if(/(?:["'(])\/(?:assets|vendor|visual-model|catalog\.json|hair-tutorials\.json|makeup-tutorials\.json|app\.js|style\.css|design\.css|manifest\.webmanifest)/.test(text))throw Error('Root-only asset URL in '+file);
  if(/(?:https?:\/\/(?:localhost|127\.0\.0\.1)|\/workspace\/|\/mnt\/data\/|C:\\\\)/i.test(text))throw Error('Developer-only URL/path in '+file);
  for(const match of text.matchAll(/["'(](\.\/(?:assets\/|vendor\/|visual-model\/)[^"'\s`<>)]*|\.\/[\w.-]+\.(?:json|webmanifest|js|css))(?=["'\s`<>)])/g)){
   const target=path.resolve(/\.json$/.test(file)?root:path.dirname(file),match[1]);
   try{await fs.access(target)}catch{missing.push(path.relative(root,file)+' → '+match[1])}
  }
 }
 if(missing.length)throw Error('Missing public assets:\n'+[...new Set(missing)].join('\n'));
 const model=JSON.parse(await fs.readFile(path.join(root,'visual-model/manifest.json'),'utf8'));
 const h=createHash('sha256');let bytes=0;
 for(const part of model.parts){const b=await fs.readFile(path.join(root,'visual-model',part));bytes+=b.length;h.update(b)}
 if(bytes!==model.bytes||h.digest('hex')!=='583fd1110a514667812fee7d684952aaf82a99b959760c8d7dca7e0ab9839299')throw Error('Model weights are missing or changed. Upload all 11 clip-*.bin files.');
 if(model.labels.length!==12)throw Error('Expected all 12 model labels.');
 const wasm=await fs.readFile(path.join(root,'vendor/ort-wasm-simd-threaded.wasm'));if(wasm.subarray(0,4).toString('hex')!=='0061736d')throw Error('Missing ONNX Runtime WASM.');
 return {files:files.length,modelBytes:bytes,labels:model.labels.length};
}
