import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { pages, school, gallery, onlineLessons } from './content.mjs';
const htmls = await Promise.all(pages.map(p => readFile(p.path === '/' ? 'dist/index.html' : `dist${p.path}/index.html`, 'utf8')));
for (let i = 0; i < pages.length; i++) {
  const html = htmls[i];
  assert.equal((html.match(/<h1>/g) ?? []).length, 1, `${pages[i].path}: um título principal`);
  assert(html.includes(`<title>${pages[i].title}</title>`));
  assert(html.includes('Sobreloja 3 – 1° subsolo'));
  assert(!html.includes(school.legacy.whatsapp));
  assert(!html.includes('experimental gratuita'));
  for (const m of html.matchAll(/(?:src|href)="(\/[^"?#]+)"/g)) {
    const url = m[1];
    if (pages.some(p => p.path === url)) continue;
    await access(`dist${url}`);
  }
  for (const m of html.matchAll(/<a\s[^>]*target="_blank"[^>]*>/g)) assert(m[0].includes('rel="noopener noreferrer"'));
}
assert(school.contacts.whatsapp === null || /^\d{10,15}$/.test(school.contacts.whatsapp.replace(/\D/g, '')));
assert(school.contacts.youtube === null || /^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(school.contacts.youtube));
assert(onlineLessons.every(l => typeof l.availabilityConfirmed === 'boolean' && (l.whatsapp === null || /^\d{10,15}$/.test(l.whatsapp.replace(/\D/g, '')))));
assert(gallery.every(g => g.postUrl === null || /^https:\/\/www\.instagram\.com\/(p|reel)\//.test(g.postUrl)));
assert.equal(new Set(pages.map(p => p.title)).size, pages.length);
console.log('Checks aprovados: 8 rotas, títulos, arquivos locais, endereço, segurança de links e contatos pendentes.');
