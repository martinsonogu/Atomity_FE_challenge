# Cost Explorer

A single-page cloud cost exploration section built in Next.js with TypeScript, Tailwind, and Framer Motion. The goal was to create a polished, animated data-heavy product section.

## Approach

This project was designed around a small set of product principles:

- Use a design-token system instead of scattered raw hex values.
- Build reusable UI primitives instead of monolithic markup.
- Fetch public data asynchronously and render loading/error/success states.
- Keep motion purposeful and subtle, with scroll-triggered transitions and reduced-motion support.
- Keep the UI responsive for desktop, tablet, and mobile layouts.

## Architecture

The app is organized around feature-level components and hooks:

- `src/pages` contains the page shell and app entry.
- `src/features/cost-explorer` contains the actual product section.
- `src/tokens` centralizes design values and CSS variable references.
- `src/styles/globals.css` defines the global theme tokens and modern CSS patterns.
- `src/features/cost-explorer/hooks` handles async data fetching and drill-path logic.
- `src/features/cost-explorer/components` contains reusable UI pieces like badges, bars, tables, and headers.

## Data Flow

The section fetches a public product feed from DummyJSON and transforms it into a deterministic cost tree. The data is then grouped by category, brand, and resource, then rendered as drillable cost nodes.

This approach gives the app a realistic “cost explorer” feel without needing a real billing backend. It also keeps the frontend logic crisp: fetch → transform → render → drill.

## Time Filtering

The app includes a time-range selector to demonstrate product control behavior. The selected range adjusts a mock multiplier that affects the cost magnitude of the data slice. This keeps the interaction meaningful even when the underlying source data has no real time dimension.

## Styling and Motion

The styling system relies on CSS custom properties and token references for colors, radii, shadows, and typography. Motion is handled through Framer Motion, with simple entrance transitions and reduced-motion fallbacks.

The layout is intentionally lightweight but polished, balancing:
- hierarchy
- density
- interactivity
- tone and readability

## Tradeoffs

Because the app is a frontend challenge demo, it uses mock data rather than a true cloud billing API. That means the experience is realistic in structure and behavior, but intentionally simplified for this purpose.

## Run locally

```bash
npm install
npm run dev