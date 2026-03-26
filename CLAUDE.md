# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Random Nickname Generator (랜덤 닉네임 생성기) is a Next.js web app that generates random nicknames in Korean and English. All UI text is in Korean. The app is client-side only with no backend or database — all state (history, favorites, settings) lives in React component state and resets on page reload.

## Build & Run Commands

```bash
npm install              # Install dependencies
npm run dev              # Start dev server (next dev)
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint (next/core-web-vitals + next/typescript)
```

## Architecture

Single-page Next.js 15 app (App Router) with Tailwind CSS v4 and TypeScript.

- **Entry point**: `src/app/page.tsx` renders `RandomNicknameGenerator` as the sole page.
- **Core logic** (`src/lib/`):
  - `nicknameGenerator.ts` — generation algorithm that combines adjective + noun/job/custom words, targeting a specific character length (±1 tolerance). Uses retry loop (up to 100 attempts) with fallback. Korean nicknames are concatenated directly; English nicknames are PascalCased.
  - `nicknameData.ts` — static word lists (adjectives, nouns, jobs) for both Korean and English, including onomatopoeia.
- **Types** (`src/types/nickname.ts`): `GeneratorSettings` (language, targetLength, includeJobs, customWords), `NicknameHistoryItem`, `NicknameData`, `Language`.
- **Components** (`src/components/`):
  - `RandomNicknameGenerator.tsx` — main stateful component (`"use client"`), orchestrates generation, clipboard, history, and settings state.
  - `NicknameDisplay.tsx` — shows current nickname with generate/copy/settings/history buttons.
  - `GeneratorControls.tsx` — settings panel: language, target length (2-20 with presets), jobs toggle, custom words, and themed presets (animal, nature, job, art).
  - `NicknameHistory.tsx` — favorites and recent (last 10) with copy/delete actions.
  - `ui/` — reusable `Button`, `Card`, `Input`, `Select` primitives with glassmorphism styling.

## Key Patterns

- **Path alias**: `@/*` maps to `./src/*`.
- **Styling**: Tailwind utility classes with glassmorphism theme (white/opacity backgrounds, backdrop-blur, gradient purple-pink-red background).
- **Icons**: `lucide-react` for all icons (`Sparkles`, `Shuffle`, `Copy`, `Settings`, `History`, `Heart`, `Trash2`, `Clock`).
- **No persistence**: History and settings are ephemeral React state — no localStorage or server state.
