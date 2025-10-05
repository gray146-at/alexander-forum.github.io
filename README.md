
# Alexander Forum – Landingpage

**Was ist das?**  
Eine ultraleichte statische Seite: `index.html` + `styles.css` + Assets. Perfekt für GitHub Pages.

## Schritt-für-Schritt (Kurz)
1. Repo anlegen (z. B. `alexander-forum.github.io` *oder* ein Projekt-Repo).
2. Dateien aus diesem Ordner hochladen.
3. In GitHub: **Settings → Pages** → Source: `main` (root). Speichern.
4. Optional: **Custom domain** setzen (legt `CNAME`-Datei an).
5. In deinem DNS: `A`-Records (Apex) und `CNAME` (www) konfigurieren. Siehe unten.

## DNS (GitHub Pages, Stand 2025)
**Apex (`example.com`) – A-Records:**  
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

**Optional IPv6 – AAAA-Records:**  
- 2606:50c0:8000::153
- 2606:50c0:8001::153
- 2606:50c0:8002::153
- 2606:50c0:8003::153

**www-Subdomain (`www.example.com`) – CNAME:**  
- Wert: `<USERNAME>.github.io` (ohne Repository-Namen)

> In GitHub Pages anschließend **Enforce HTTPS** aktivieren (kann bis 24 h dauern).

## Text/Branding ändern
- Logo ersetzen: `assets/logo.svg`
- Titel/Subline in `index.html` anpassen
- Farben/Abstände in `styles.css` (Variablen im `:root`)
