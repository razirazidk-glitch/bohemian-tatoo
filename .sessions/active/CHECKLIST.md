# SESSION CHECKLIST: Bohemian Tatoo Website & GitHub Pages Deployment

## 1. Setup & Arkitektur
- [x] Initialisering af session og kravspecifikation
- [x] Oprettelse af projektstruktur (`assets/css`, `assets/js`, `assets/images`)
- [x] Download og integration af autentiske billeder og logo fra Instagram `@bohemiantattooparlour`
- [x] Oprettelse af semantisk `index.html` med centreret logo/brand i toppen, hero, om os, galleri, artister, hygiejne, aftercare, booking og kontakt
- [x] Udvikling af responsiv styling i `assets/css/styles.css` (mobil, tablet, desktop)
- [x] Udvikling af interaktiv frontend funktionalitet i `assets/js/main.js` (mobilmenu, lightbox galleri, booking-validering, accordion)

## 2. Visuel & Responsiv Verifikation (Pre-Presentation Visual Gate)
- [x] Start af lokal webserver på port 8085
- [x] Puppeteer desktop screenshot (1920x1080)
- [x] Puppeteer tablet screenshot (768x1024)
- [x] Puppeteer mobil screenshot (375x812)
- [x] Puppeteer interaktivitetstest (Lightbox modal åbning, mobilmenu navigation)
- [x] `view_file` inspektion af screenshots og 3-punkts Red Team audit (kontrast, layout, visuel kvalitet)

## 3. GitHub & GitHub Pages Deployment
- [x] `git init` og konfiguration
- [x] Oprettelse af offentligt GitHub repo via `gh repo create` -> `https://github.com/razirazidk-glitch/bohemian-tatoo`
- [x] Push til GitHub `main` branch
- [x] Aktivering af GitHub Pages -> `https://razirazidk-glitch.github.io/bohemian-tatoo/`
- [x] Opdatering af `README.md` med links til ejer og udvikler
