# José Otávio · Backend Developer Portfolio

**Live:** https://portfoliojoseramos.vercel.app

A terminal-inspired portfolio for a backend developer, built with React, Tailwind CSS v4 and Vite. English by default, with a Portuguese (PT-BR) toggle.

## Highlights

- **Boot screen + network background:** a canvas graph of nodes with data packets travelling between them, reacting to the cursor.
- **Hero terminal:** types a `curl` request and prints a syntax-highlighted JSON response.
- **Real-world impact:** the iFood API integration case study and before/after performance metrics with animated bars.
- **Architecture diagram:** an animated SVG request flow (client, API, service, cache, database, queue) with request and response packets.
- **API playground:** a mock API running in the browser (status, latency, JSON, copy-as-cURL).
- **Projects as a query:** `SELECT * FROM projects`, with 3D-tilt cards and code previews.
- **Command palette:** `Ctrl/Cmd + K` to navigate, download the CV, or switch language.
- **Details:** dark/light theme, scroll progress bar, scroll-spy navigation, reduced-motion support, and a CV that follows the selected language.

## Stack

React 18 · Vite 5 · Tailwind CSS 4 · Lucide icons · Radix Toast. No animation library: everything is CSS, SVG and canvas.

## Run locally

```bash
git clone https://github.com/JoseOtavioJunqueira/developer-portfolio-react.git
cd developer-portfolio-react
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
npm run lint
```

## Project structure

```
src/
  components/   sections (Hero, About, Experience, Architecture, Skills, ApiPlayground, Projects, Contact) and effects
  lib/          translations.js (EN/PT), highlight.jsx (JSON highlighter)
  context/      LanguageContext (language + CV link)
public/cv/      resumes in English and Portuguese
```

Content lives in `src/lib/translations.js`; project cards are defined in `src/components/ProjectsSection.jsx`.

## License

MIT
