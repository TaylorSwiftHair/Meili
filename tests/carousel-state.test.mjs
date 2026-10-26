import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {catalogSlide,ROUTINES} from '../site/design.js';
import {LOOKS} from '../site/data.js';
const assets=JSON.parse(fs.readFileSync(new URL('../site/assets/ui-slots.json',import.meta.url)));
for(const [kind,list] of [['hair',ROUTINES],['makeup',LOOKS]])test(kind+' carousel keeps the photo, title, description and palette on one index',()=>{const images=new Set(),colors=new Set();for(let index=0;index<list.length;index++){const slide=catalogSlide(kind,list,index,assets),record=assets.catalogs[kind][list[index].id];assert.equal(slide.item.id,list[index].id);assert.equal(slide.item.name,record.name||list[index].name);assert.equal(slide.portraits[1].name,slide.item.name);assert.equal(slide.portraits[1].id,slide.item.id);assert.equal(slide.portraits[1].image,record.image);assert.equal(slide.accent,record.accent);assert.equal(slide.labelColor,record.labelColor);assert.equal(slide.description,record.description||list[index].subtitle);images.add(record.image);colors.add(record.accent)}assert.equal(images.size,list.length);assert.equal(colors.size,list.length);assert.equal(catalogSlide(kind,list,list.length,assets).item.id,list[0].id);assert.equal(catalogSlide(kind,list,-1,assets).item.id,list.at(-1).id)});

test('the imported logo artwork stays byte-for-byte intact',()=>assert.equal(createHash('sha256').update(fs.readFileSync(new URL('../site/assets/branding/meili-logo.png',import.meta.url))).digest('hex'),'65964063e1a6e1c84438909f716cb13d78d36812c194babf91f54eade1b9ee1a'));

test('hair catalog contains exactly four supplied full-figure assets and family routes',()=>{
 assert.deepEqual(ROUTINES.map(r=>r.id),['1','2','3','4']);
 for(const [i,family] of ['Straight','Wavy','Curly','Coily'].entries()){
  const id=String(i+1),record=assets.catalogs.hair[id];
  assert.equal(record.name,`Type ${id} — ${family} Hair`);
  assert.equal(record.image,`./assets/hair-art/type-${id}-${family.toLowerCase()}-hair.png`);
  assert.ok(fs.existsSync(new URL('../site/'+record.image,import.meta.url)));
 }
 assert.deepEqual(Object.keys(assets.catalogs.hair),['1','2','3','4']);
});
