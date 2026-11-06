# श्री रामायण — The Return of Light

A mobile-first, cinematic storytelling experience that follows the seven Kandas of the Ramayana and closes with the return to Ayodhya and the lights of Diwali.

## Experience

- An opening diya interaction with a skip option.
- Seven chapters with original English retellings, Devanagari chapter titles and illustrated scenes.
- Chapter navigation and a reading-progress indicator.
- Optional synthesized ambient drone and browser text-to-speech narration. Both require the visitor to turn them on.
- A Diwali finale with a Pushpak Vimana illustration, diyas and lightweight canvas fireworks.
- Responsive layouts, keyboard focus states and reduced-motion support.

## Story and cultural note

The text is an original, concise retelling, not a translation or quotation from a scripture. The Ramayana has many regional, linguistic and devotional traditions. The Uttara Kanda section explicitly acknowledges that its later episodes are received differently across traditions rather than presenting one version as universal.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
npm run preview
```

## GitHub Pages deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds the site and deploys the `dist` directory whenever code is pushed to `main` (or when manually started from Actions).

In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. The Vite configuration uses relative asset paths, so the site can be served from a repository subpath.

Expected project URL: `https://4ksh2574.github.io/Shubh-Dipawali/`

## Technology

React 18, TypeScript, Vite, Tailwind CSS 4, Motion and Lucide icons. No backend, API key, paid asset service or external audio file is required.
