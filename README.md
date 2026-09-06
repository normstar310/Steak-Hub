# Steak Hub

Mobile-first steak cooking timer. Pick a cut, thickness, and method; run a big stopwatch; compare against community averages; save personal cook history on-device.

## Features

- Timer hero: large mm:ss or h:mm:ss, Start/Stop, Reset (requestAnimationFrame)
- Setup: 10 cuts, 5 thicknesses, charcoal / gas / cast-iron, optional doneness
- Save on stop: prompt to log cook details to localStorage
- Averages: seeded Community avg for every combo; My avg from your logs
- Offline: timer + history work without a network; light service worker caches the app shell

## Stack

Vite + React + TypeScript. Single-page app, no auth.

## Run

Use package scripts: install deps, then run the Vite dev server. Build with the build script; preview with preview.

## Layout

- src/App.tsx, src/components, src/data, src/hooks, public/sw.js

## Notes

History uses localStorage key steak-hub-cook-history-v1. Community averages are seeded samples.

## Scripts

- dev — Vite development server
- build — Typecheck + production bundle to dist/
- preview — Serve the production build
- lint — oxlint
