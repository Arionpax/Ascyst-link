# ASCYST

Static site: plain HTML, CSS and JS. No build step.

## Files
`index.html`, `style.css`, `script.js`, `data.js` (hub), `cooked.html` (Absolute Cooked link page), `img/` (artwork).
Needed images: `img/absolute-cooked.png` (card art), `img/absco.png` (logo on the link page).

## Deploy on GitHub Pages
1. Create a new GitHub repository and upload every file and folder (keep the structure).
2. Open **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then Save.
4. Wait about a minute. Your site is live at `https://<username>.github.io/<repo>/`.

## Add a business or brand
Open `data.js`, copy one block inside `businesses` or `brands`, paste it after the last block (add a comma), and change the values. Use relative links such as `cooked.html` (never `/cooked.html`, which breaks on GitHub Pages project sites). `url: ""` makes a non-clickable card.

## Keyboard
`/` or Ctrl/Cmd+K opens search across everything. `1` to `9` opens the matching business. The link page has the same shortcuts for its links.

## Accent colour
In `style.css`, edit `--accent` in `:root` (dark) and `[data-theme=light]` (light, darker for contrast). The link page has its own `--y` colour variable and `GROUPS` list at the top of its script.

## Social preview
`og:image` is a relative path. For previews on social apps, use the full URL, e.g. `https://<username>.github.io/<repo>/img/absolute-cooked.png`.
