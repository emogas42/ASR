# ASR Project — Claude Working Guide

## Stack
- Static multi-page site: HTML5 + CSS3 + Vanilla JS (no build tools, no npm)
- Bilingual: Azerbaijani (default) + Russian (`-ru` suffix, e.g. `index-ru.html`)
- Single shared JS: `app.js` (navbar scroll, scroll-spy, mobile nav)

## File Naming Convention
| Pattern | Meaning |
|---|---|
| `index.html` | AZ homepage |
| `index-ru.html` | RU homepage |
| `xidmet-01.html` | Service page 1 (AZ) |
| `xidmet-01-ru.html` | Service page 1 (RU) |
| `bloq1.html` | Blog post 1 (AZ) |
| `sectors.html` | Sectors overview |

## Key Rules
1. **Always edit both language versions** when changing shared content/layout.
2. `app.js` is shared — changes affect every page.
3. No frameworks, no transpilers. Plain ES5-compatible JS only.
4. Images live in `images/` — do not reorganize paths.

## Common Tasks
- **New page:** copy closest existing page, update content, create `-ru` pair.
- **Navbar/footer change:** update `index.html` as reference, then propagate.
- **Style change:** find the relevant CSS block in the page's `<style>` tag or linked `.css` file.

## Efficiency Notes
- Read one representative file before editing many similar ones.
- When a change affects all pages, do a Grep first to find exact patterns.
- Confirm scope with user before touching more than 3 files at once.
