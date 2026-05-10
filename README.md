# Sheepy Farm Prototype

Hardcoded HTML/CSS/JS visual prototype for client demo (May 9–10, 2026).

## Stack

Vanilla HTML + CSS + JS only. No build step. No framework.

## How to demo

Open `index.html` in any modern browser. Use the login page to pick from 5 demo roles: Admin / Warehouse / Packing / Driver / Wholesaler.

## Folder layout

```
prototype/
├── index.html          Public landing page
├── login.html          Shared login (5 demo role buttons)
├── shared/             CSS theme, glass utilities, mobile shell, mock data, nav partials
├── admin/              Admin HQ dashboard (desktop)
├── warehouse/          Warehouse manager dashboard (desktop) — monitor only
├── packing/            Packing staff app (mobile-only — bottom nav)
├── driver/             Driver staff app (mobile-only — bottom nav)
└── wholesaler/         B2B buyer dashboard (desktop + mobile responsive)
```

## Role architecture (5 roles)

| Role | Surface | Function |
|---|---|---|
| **Admin HQ** | desktop | Manage products, stock, prices, warehouses, wholesalers, RBAC, settings |
| **Warehouse Manager** | desktop | Monitor pipeline, stock receive, quote pricing, staff overview |
| **Packing Staff** | mobile only | Pull orders from queue, FEFO pick + pack, hand off to driver |
| **Driver Staff** | mobile only | Grab packed orders, deliver with photo + temp proof |
| **Wholesaler** | desktop + mobile | Browse catalog (region-locked), buy or submit custom quote, track orders |

## Order lifecycle (handoff)

```
Wholesaler places → Manager sees → Packing picks/packs → Driver delivers
   NEW              NEW            PICKING → PACKED       OUT-FOR-DELIVERY
                                                               ↓
                                                           DELIVERED
```

The warehouse manager **does not pick or dispatch** — packing staff auto-pull orders from the queue on their mobile, drivers grab packed orders from theirs.

## Visual system

- Palette: white background, red accents, black text
- Glassmorphism: frosted-glass surfaces with backdrop-blur
- Desktop: left sidebar shell
- Mobile: bottom navigation, native-app feel (locked to 480px on packing/driver pages)
