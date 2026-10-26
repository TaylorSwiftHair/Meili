import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {resolveHairTutorial} from '../site/design.js';
const data=JSON.parse(fs.readFileSync(new URL('../site/hair-tutorials.json',import.meta.url)));
const brief=fs.readFileSync(new URL('../artwork/hair-tutorial-brief.txt',import.meta.url),'utf8').replace(/\r/g,'');
const sections=brief.split(/^# (?:14|15|16|17)\. /m).slice(1).map(s=>s.split(/^# \d+\./m)[0]);
test('four live hair datasets match the authored step headings and paragraphs',()=>{
 assert.deepEqual(Object.keys(data),['1','2','3','4']);
 for(const [i,section] of sections.entries()){
  const steps=section.split(/^## Step \d+ — /m).slice(1),actual=data[String(i+1)].steps;
  assert.equal(actual.length,[7,7,9,9][i]);assert.equal(steps.length,actual.length);
  for(const [j,block] of steps.entries()){
   assert.equal(actual[j].title,block.split('\n')[0]);
   const description=block.split('Description:\n\n')[1].split(/\n\n(?:Use the |These |This |All of this |Do not |### )/)[0].trim();
   assert.equal(actual[j].description,description);
   assert.equal(actual[j].image,`./assets/hair-steps/${i+1}/${String(j+1).padStart(2,'0')}.png`);
   assert.ok(fs.existsSync(new URL('../site/'+actual[j].image,import.meta.url)));
  }
 }
});
test('subtypes and old personal links resolve to the same broad four routines',()=>{
 for(let i=1;i<=4;i++)for(const suffix of ['','A','B','C','a','b','c'])assert.equal(resolveHairTutorial(i+suffix,data),data[i]);
 for(const [i,slug] of ['straight','wavy','curly','coily'].entries())assert.equal(resolveHairTutorial(slug,data),data[i+1]);
 assert.equal(resolveHairTutorial('personal',data,'4B'),data[4]);
 assert.equal(resolveHairTutorial('unknown',data),null);
});
