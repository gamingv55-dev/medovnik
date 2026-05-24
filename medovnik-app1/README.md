# Медовник — React + Vite

Pixel-faithful React + Vite re-implementation of the original
`Медовник.html`. Same fonts, same colors, same animations, same
markup — split into clean components.

## Stack
- **React 18** + **React Router 6** for routing
- **Vite 6** for the dev server / build
- A single `src/styles/global.css` carries every design token, the
  embedded UniSans heavy font, and every component style — exactly
  matching the original stylesheet.

## Quick start
```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build to /dist
npm run preview      # preview the build
```

## Project layout
```
src/
├── main.jsx                 React entry
├── App.jsx                  Router + global providers
├── styles/global.css        All visual styles (extracted 1:1)
├── data/                    Static content (products, FAQs, reviews…)
├── context/                 Cart + Auth providers
├── hooks/                   useScrolled, useClickOutside
├── utils/                   Formatters
├── components/
│   ├── layout/              Navbar, Footer, CartDrawer, AuthModal
│   ├── sections/            Hero, Trust, Movement, HowItWorks, …
│   ├── illustrations/       4 animated SVG step illustrations
│   └── ui/                  ProductCard, AddonCard, Channel, …
└── pages/                   HomePage, ShopPage, CommunityPage, …
```

## Routes
| Path           | Page              |
| -------------- | ----------------- |
| `/`            | HomePage          |
| `/shop`        | ShopPage          |
| `/community`   | CommunityPage     |
| `/reviews`     | ReviewsPage       |
| `/my-mead`     | MyMeadPage (auth) |

## Notes
- The Discord-unlock threshold (70 лв.) lives in `CartContext`.
- Google sign-in is stubbed in `AuthContext` — wire it to your
  Firebase / Supabase / OAuth provider when ready.
- The UniSans Heavy font is embedded as a data URI inside
  `global.css`. Original license: © Svetoslav Simov / Fontfabric.
