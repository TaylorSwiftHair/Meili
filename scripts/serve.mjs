import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const argv=process.argv.slice(2),option=(key,fallback)=>argv.find(x=>x.startsWith(key+'='))?.slice(key.length+1)||fallback;
const root=fileURLToPath(new URL(argv.includes('--production')?'../_site/':'../site/',import.meta.url));
let base=option('--base','/');if(!base.startsWith('/')||base.includes('..'))throw Error('Use a base such as /meili/');if(!base.endsWith('/'))base+='/';
const port=Number(option('--port',process.env.PORT||'8080'));
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.wasm':'application/wasm','.bin':'application/octet-stream','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.ttf':'font/ttf','.woff2':'font/woff2','.md':'text/plain; charset=utf-8'};
http.createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://local.test').pathname);
  if(pathname===base.slice(0,-1)){res.writeHead(308,{location:base});res.end();return}
  if(!pathname.startsWith(base)){res.writeHead(404);res.end('Not found');return}
  const relative=pathname.slice(base.length)||'index.html';let target=path.resolve(root,relative);
  if(!target.startsWith(root)){res.writeHead(403);res.end();return}
  if(relative==='README.md'&&!argv.includes('--production'))target=fileURLToPath(new URL('../README.md',import.meta.url));
  const bytes=await fs.readFile(target);res.writeHead(200,{'content-type':types[path.extname(target)]||'application/octet-stream','cache-control':'no-store'});res.end(bytes);
 }catch{res.writeHead(404);res.end('Not found')}
}).listen(port,()=>console.log(`MeiLi available at http://localhost:${port}${base} (Ctrl+C to stop)`));
