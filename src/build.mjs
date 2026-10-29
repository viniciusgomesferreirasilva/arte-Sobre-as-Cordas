import { contentSecurityPolicy, securityHeaders } from './security.mjs';
import { mkdir, rm, cp, writeFile } from 'node:fs/promises';
import { pages, school, studentSupport, courses } from './content.mjs';
import { header, footer, modal, searchModal, floatingContact, esc } from './components.mjs';
import { renderPage } from './pages.mjs';
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('public', 'dist', { recursive: true });
await writeFile('dist/site-config.js', `window.schoolConfig=${JSON.stringify({ contacts: school.contacts, studentSupport, searchIndex: [...pages.map(p => ({title:p.label, description:p.description, url:p.path === "/" ? "/" : p.path+"/"})), ...courses.map(c => ({title:c.name, description:c.description, url:"/cursos/#"+c.id}))] })};`);
for (const p of pages) {
  const dir = p.path === '/' ? 'dist' : `dist${p.path}`;
  await mkdir(dir, { recursive: true });
  const html = `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"><meta http-equiv="Content-Security-Policy" content="${esc(contentSecurityPolicy)}"><meta name="referrer" content="no-referrer"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#4b3227"><meta name="description" content="${esc(p.description)}"><meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.description)}"><meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="Arte Sobre as Cordas"><meta name="twitter:card" content="summary"><meta name="twitter:title" content="${esc(p.title)}"><meta name="twitter:description" content="${esc(p.description)}"><title>${esc(p.title)}</title><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preload" href="/assets/sora-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/styles.css"><script defer src="/site-config.js"></script><script defer src="/app.js"></script></head><body data-page="${p.path}">${header(p.path)}<main id="conteudo">${renderPage(p.path)}</main>${footer()}${modal()}${searchModal()}${floatingContact()}<noscript><div class="noscript-notice">Para conversar com a escola, acesse o <a href="${school.contacts.instagram}" target="_blank" rel="noopener noreferrer">Instagram oficial</a>. Você também pode <a href="https://wa.me/${school.contacts.whatsapp}" target="_blank" rel="noopener noreferrer">falar com o setor administrativo pelo WhatsApp</a>.</div></noscript></body></html>`;
  const normalized = html.replace(/href="(\/[a-z0-9-]+)(?=["#])/g, (_, route) => `href="${route}/`);
  await writeFile(`${dir}/index.html`, normalized);
}
console.log(`Build concluído: ${pages.length} páginas estáticas com URLs próprias.`);

await writeFile('dist/_headers', `/*\n${Object.entries(securityHeaders).map(([key,value])=>`  ${key}: ${value}`).join('\n')}\n`);
