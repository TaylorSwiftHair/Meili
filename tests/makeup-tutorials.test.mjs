import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {resolveMakeupTutorial} from '../site/design.js';
const data=JSON.parse(fs.readFileSync(new URL('../site/makeup-tutorials.json',import.meta.url)));
const art=JSON.parse(fs.readFileSync(new URL('../site/assets/ui-slots.json',import.meta.url)));
const sequences={
'bambi':['Moisturizer','Concealer','Blush','Brown Eyeshadow','Mascara','Contour','White Tightlining','Freckles','Lipgloss','Lipliner','Setting Spray'],
'clean-girl':['Moisturizer','Concealer','Eyebrow Tint','Blush','Contour','Highlighter','Mascara','Setting Spray','Lipgloss'],
'douyin':['Moisturizer','Primer','Foundation','Blush','Loose Powder','Lipgloss','Contour','Highlighter','Mascara','Setting Spray'],
'full-matte':['Moisturizer','Primer','Foundation','Lighter Concealer','Contour','Blush','Eyeshadow','Mascara','Eyeliner','Lipgloss','Eyebrows','Highlighter','Setting Spray'],
'goth':['Moisturizer','White Foundation','Grey / Cool-Toned Contour','Black or Blue Eyeshadow','Eyeliner','Mascara','Eyebrows','Black Lipstick','Setting Powder','Setting Spray'],
'soft-glam':['Moisturizer','Primer','Foundation','Concealer','Contour','Blush','Highlighter','Setting Powder','Lip Liner','Lipstick','Eyeshadow','Setting Spray']};
test('catalog and legacy links resolve to the exact matching routine',()=>{for(const [legacy,entry] of Object.entries(art.catalogs.makeup)){const r=resolveMakeupTutorial(entry.tutorialId,data);assert.equal(r.legacyId,legacy);assert.equal(r.name,entry.name);assert.equal(resolveMakeupTutorial(legacy,data),r)}assert.equal(resolveMakeupTutorial('not-a-style',data),null)});
test('all supplied written step orders and final images are complete',()=>{for(const [id,titles] of Object.entries(sequences)){const r=data[id];assert.deepEqual(r.steps.map(x=>x.title),titles);for(const [i,step] of r.steps.entries()){assert.ok(step.description.length>30);assert.ok(step.image.endsWith('/'+String(i+1).padStart(2,'0')+'.png'));assert.ok(fs.existsSync(new URL('../site/'+step.image,import.meta.url)))}assert.ok(fs.existsSync(new URL('../site/'+r.finalImage,import.meta.url)));assert.ok(r.finalImage.endsWith('/final.png'))}});
