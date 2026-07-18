# Project Guidelines

## Stack
- Next.js 15 (App Router)
- Tailwind CSS
- GSAP

## Styling
- Strictly use Tailwind CSS utility classes. No inline styles, no CSS modules.
- Adhere to a 4pt grid system for spacing (e.g., `p-4`, `gap-8`, `mt-12`).

## Components
- Build modular, strictly typed functional React components in `/components/ui`.
- Every component must have an explicit TypeScript `interface`/`type` for its props.

## Animations
- Use the `@gsap/react` `useGSAP()` hook for all GSAP animations.
- Default scroll easing is `power3.out`.

## Data
- Components must accept data via props.
- Use mock data from `/data` during development; do not hardcode content in components.
