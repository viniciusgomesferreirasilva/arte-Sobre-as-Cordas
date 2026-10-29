// Requer Playwright disponível no ambiente e npm run dev em execução.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import assert from 'node:assert/strict';
import { pages, courses } from '../src/content.mjs';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
try {
const page=await browser.newPage(); const errors=[];
page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(()=>{window.open=(url)=>{window.lastOpenedUrl=url;return null;};});
for(const viewport of [{width:390,height:844},{width:1440,height:900}]){
 await page.setViewportSize(viewport);
 for(const route of pages){
  const response=await page.goto('http://127.0.0.1:4173'+route.path+'/'.replace(/^\/$/,route.path==='/'?'':'/'));
  assert.equal(response.status(),200,route.path);
  assert.equal(await page.locator('h1').count(),1);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow ${route.path} ${viewport.width}`);
  assert(await page.getByRole('link',{name:'Instagram da Arte Sobre as Cordas (abre em nova aba)',exact:true}).count()>0);
 }
}
await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4173/');
assert.equal(await page.locator('.menu-toggle span').count(),3);
await page.getByRole('button',{name:'Abrir menu',exact:true}).click();assert(await page.locator('#mobile-nav').isVisible());
await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
await page.getByRole('button',{name:'Pesquisar no site'}).click();await page.locator('#search-input').fill('violao classico');
assert(await page.locator('#search-results').innerText().then(t=>t.includes('Violão Clássico')));await page.keyboard.press('Escape');
for(const route of ['/cursos/','/pagamentos/']){
 await page.goto('http://127.0.0.1:4173'+route);
 for(const course of courses){
  if(route==='/pagamentos/')await page.getByRole('tab',{name:course.name,exact:true}).click();
  const button=page.locator(`[data-course="${route==='/pagamentos/'?'Pagamento de ':''}${course.name}"]`).first();
  await button.click();
  const url=new URL(await page.evaluate(()=>window.lastOpenedUrl));assert.equal(url.hostname,'wa.me');assert.equal(url.pathname,'/5511982973432');
  assert.equal(url.searchParams.get('text'),`Olá! Tudo bem? Tenho interesse no curso de ${course.name} da Arte Sobre as Cordas e gostaria de receber mais informações sobre as formas de pagamento, valores e condições disponíveis. Agradeço desde já!`);
 }
}
await page.goto('http://127.0.0.1:4173/cursos/');await page.getByRole('button',{name:'Teclas',exact:true}).click();assert(await page.locator('[data-course-family="teclas"]').isVisible());assert(!(await page.locator('[data-course-family="cordas"]').first().isVisible()));
await page.goto('http://127.0.0.1:4173/galeria/');await page.getByRole('button',{name:'Apresentações',exact:true}).click();assert.equal(await page.locator('.gallery-page .gallery-item:visible').count(),3);
assert.deepEqual(errors,[]);console.log('PASS: 10 rotas em celular/desktop, sem overflow ou erros JS; menu, pesquisa sem acentos, filtros, Instagram acessível e 12 mensagens WhatsApp exatas.');
} finally {await browser.close();}
