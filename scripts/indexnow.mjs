#!/usr/bin/env node
/*
  Meldet die Adressen aus der Sitemap per IndexNow (Bing, Yandex, Seznam, Naver; nicht Google).
    node scripts/indexnow.mjs              Probelauf: prüft Schlüsseldatei und Adressen
    node scripts/indexnow.mjs --senden     wirklich an https://api.indexnow.org/indexnow schicken
    node scripts/indexnow.mjs <URL> …      nur diese Adressen (statt der Sitemap)
  Der Schlüssel ist öffentlich gedacht (Datei im Stammverzeichnis), kein Geheimnis.
  Antworten: 200 gemeldet, 202 angenommen (Schlüsselprüfung läuft), 403 Schlüssel ungültig, 422 Host passt nicht, 429 zu oft.
*/
const HOST = 'alexander.forum';
const KEY = '4f73449dd5e5025be61d40d4abd8f2b5';
const BASIS = `https://${HOST}`;
const SITEMAPS = ['sitemap.xml', 'sitemap-psyinfra.xml'];

const args = process.argv.slice(2);
const senden = args.includes('--senden');
let adressen = args.filter((a) => /^https?:\/\//.test(a));

if (!adressen.length) {
  for (const sm of SITEMAPS) {
    const xml = await (await fetch(`${BASIS}/${sm}`)).text();
    adressen.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()));
  }
}
adressen = [...new Set(adressen)].filter((u) => u.startsWith(BASIS + '/'));

const ok = [];
for (const u of adressen) {
  const r = await fetch(u, { redirect: 'manual' });
  if (r.status === 200) ok.push(u); else console.log(`nicht gemeldet (${r.status}): ${u}`);
}
console.log(`${ok.length} Adressen mit 200`);

const schluessel = (await (await fetch(`${BASIS}/${KEY}.txt`)).text()).trim();
if (schluessel !== KEY) { console.error('Schlüsseldatei live nicht korrekt.'); process.exit(1); }

if (!senden) { console.log('Probelauf. Zum Melden --senden anhängen.'); process.exit(0); }
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${BASIS}/${KEY}.txt`, urlList: ok }),
});
console.log(`IndexNow: HTTP ${res.status} ${(await res.text()).trim()}`);
