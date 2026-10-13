import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { safeUrl, contentSecurityPolicy } from './security.mjs';
import { external, button } from './components.mjs';
import { pages } from './content.mjs';
for(const bad of ['javascript:alert(1)','data:text/html,test','http://example.com','https://user:pass@example.com','//example.com','/\\example.com','/\nexample.com']) {
  assert.throws(()=>safeUrl(bad));
  assert.throws(()=>external(bad,'Link'));
  assert.throws(()=>button('Link',{href:bad}));
}
assert.equal(safeUrl('/cursos/#piano'),'/cursos/#piano');
assert.equal(safeUrl('https://www.instagram.com/artesobreascordas/',{external:true}),'https://www.instagram.com/artesobreascordas/');
for(const p of pages){
 const html=await readFile(p.path==='/'?'dist/index.html':`dist${p.path}/index.html`,'utf8');
 assert(html.includes('http-equiv="Content-Security-Policy"'));
 assert(html.includes('name="referrer" content="no-referrer"'));
 assert(!/<script(?![^>]*src=)[^>]*>/.test(html),'Sem script inline');
 assert(!/\son[a-z]+\s*=/.test(html),'Sem handlers inline');
 for(const frame of html.matchAll(/<iframe[^>]*>/g)){
  assert(frame[0].includes('https://maps.google.com/maps?'));
  assert(frame[0].includes('referrerpolicy="no-referrer"'));
  assert(frame[0].includes('sandbox="allow-scripts allow-same-origin allow-popups"'));
 }
}
assert(contentSecurityPolicy.includes("object-src 'none'"));
assert(contentSecurityPolicy.includes("form-action 'none'"));
assert((await readFile('dist/_headers','utf8')).includes("frame-ancestors 'none'"));
console.log('Segurança: URLs perigosas bloqueadas, 8 páginas com CSP/referrer, sem scripts inline e mapa incorporado com restrições.');
