import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {getHairRoutineHref,hairRoutineLink} from '../site/hair-routine-link.js';
const routines=JSON.parse(fs.readFileSync(new URL('../site/hair-tutorials.json',import.meta.url)));
test('all 12 result subtypes route directly to their existing canonical tutorial',()=>{
 for(let family=1;family<=4;family++)for(const suffix of ['A','B','C']){
  const label=family+suffix;assert.equal(getHairRoutineHref(label),`#hair-tutorial/${family}`);
  assert.equal(getHairRoutineHref(label.toLowerCase()),getHairRoutineHref(label));
  assert.equal(getHairRoutineHref(' Type '+label+' '),getHairRoutineHref(label));
  assert.ok(routines[family]);assert.ok(hairRoutineLink(label).includes(`href="#hair-tutorial/${family}"`));
 }
});
test('unrecognized or missing results never guess a routine or show a direct link',()=>{
 for(const value of [null,undefined,3,'','3','unknown','5A','3D','maybe 3B','3B or 4C',{},'<script>3B</script>']){
  assert.equal(getHairRoutineHref(value),null);assert.equal(hairRoutineLink(value),'');
 }
});
test('results page passes its displayed leading subtype to the link without recalculation',()=>{
 const app=fs.readFileSync(new URL('../site/app.js',import.meta.url),'utf8');
 assert.equal(app.split('${hairRoutineLink(a.rank[0]?.label)}').length-1,1);
 assert.ok(app.includes('${evidenceSummary(visual,a)}${hairRoutineLink(a.rank[0]?.label)}'));
 const original={rank:[{label:'3B',score:.41}],damage:{score:27}};const before=JSON.stringify(original);
 hairRoutineLink(original.rank[0].label);assert.equal(JSON.stringify(original),before);
});
