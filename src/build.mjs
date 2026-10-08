import { mkdir, rm, cp, writeFile } from 'node:fs/promises';
import { pages, school, studentSupport } from './content.mjs';
import { header, footer, modal, esc } from './components.mjs';
import { renderPage } from './pages.mjs';
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('public', 'dist', { recursive: true });
await writeFile('dist/site-config.js', `window.schoolConfig=${JSON.stringify({ contacts: school.contacts, studentSupport })};`);
for (const p of pages) {
  const dir = p.path === '/' ? 'dist' : `dist${p.path}`;
  await mkdir(dir, { recursive: true });
  const html = `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#4b3227"><meta name="description" content="${esc(p.description)}"><meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.description)}"><meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="Arte Sobre as Cordas"><meta name="twitter:card" content="summary"><meta name="twitter:title" content="${esc(p.title)}"><meta name="twitter:description" content="${esc(p.description)}"><title>${esc(p.title)}</title><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preload" href="/assets/sora-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/styles.css"><script defer src="/site-config.js"></script><script defer src="/app.js"></script></head><body data-page="${p.path}">${header(p.path)}<main id="conteudo">${renderPage(p.path)}</main>${footer()}${modal()}<noscript><div class="noscript-notice">Para conversar com a escola, acesse o <a href="${school.contacts.instagram}" target="_blank" rel="noopener noreferrer">Instagram oficial</a>. Os demais contatos serão disponibilizados em breve.</div></noscript></body></html>`;
  const normalized = html.replace(/href="(\/[a-z0-9-]+)(?=["#])/g, (_, route) => `href="${route}/`);
  await writeFile(`${dir}/index.html`, normalized);
}
console.log(`Build concluído: ${pages.length} páginas estáticas com URLs próprias.`);

// Manter links antigos acessíveis sem anunciar a modalidade substituída.
await mkdir('dist/aulas-online', { recursive: true });
await writeFile('dist/aulas-online/index.html', `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=/suporte-ao-aluno/"><title>Suporte ao Aluno | Arte Sobre as Cordas</title><link rel="stylesheet" href="/styles.css"></head><body><main class="container section"><h1>Suporte ao Aluno</h1><p><a class="text-link" href="/suporte-ao-aluno/">Acesse o suporte pós-aula</a></p></main></body></html>`);
