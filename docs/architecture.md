# Architecture & Technical Implementation — NAMECLOTHES

## 1. System Overview
**NAMECLOTHES** is a luxury 3D fashion e-commerce digital flagship crafted for contemporary avant-garde tailoring and high-performance digital commerce. The platform pairs editorial aesthetics with interactive 3D WebGL garment inspection, real persistent commerce states, and administrative management.

## 2. Technical Stack
- **Framework**: React 19 + TypeScript on Vite SPA.
- **Styling**: Tailwind CSS with custom editorial typographic hierarchies (`Cormorant Garamond` serif, `Plus Jakarta Sans` UI body, `Space Grotesk` monospaced tags).
- **3D Engine**: Three.js (r160+) using custom procedural multi-part models (torso, collar, flared storm skirt, raglan sleeves, storm flap, metallic buckles, titanium latches) with:
  - Procedural studio reflection via `RoomEnvironment` & `PMREMGenerator`.
  - ACESFilmic tone mapping and SRGB color pipeline.
  - Software WebGL detection (`isSoftwareGl`) for headless environments.
  - Collapsible bottom control dock ensuring 100% unobstructed central 3D viewport.
- **State Management**: Reactive custom commerce store persisted in `localStorage` for cart items, saved wishlist, customer orders, and catalog edits.
- **Commerce Features**:
  - Live inventory tracking by variant (`size` x `color`).
  - Automated threshold calculator for complimentary express delivery (₹20,000 threshold).
  - GST calculation (12% luxury apparel tax).
  - Address validation, demo order placement, and live-payment gateway attachment hooks (Razorpay / Stripe ready).
- **Administration CMS**:
  - Full product catalog CRUD (create, update, delete, price adjustments, 3D flags).
  - Order status dispatch lifecycle tracking (`confirmed` -> `processing` -> `shipped` -> `delivered`).
  - Two-CEO Governance executive audit scorecard view.

## 3. Verified Route Inventory
1. `/` — Cinematic Homepage (Scenes 01-06)
2. `/shop` — Complete Wardrobe Catalog with Category, Collection, and 3D filter toggles
3. `/collections` — Collections Monograph Index
4. `/collections/architectural` — Architectural Silhouettes
5. `/collections/monolith` — Monolith Brutalist Silhouettes
6. `/collections/capsule-01` — Fluid Cashmere & Silk Bias Series
7. `/collections/hyper-minimal` — Wholegarment Seamless & Leather Goods
8. `/product/:slug` — Product Detail Page with 3D/Photo Toggle & Size Matrix
9. `/wishlist` — Client Saved Wardrobe Wishlist
10. `/cart` — Comprehensive Bag & Financial Settlement
11. `/checkout` — Encrypted 256-Bit SSL Atelier Checkout & Order Generator
12. `/account` — Client Account & Dispatch Dossier Portal
13. `/about` — Brand Monograph & Material Provenance
14. `/contact` — Client Concierge & Atelier Dialogue Form
15. `/shipping-returns` — Global Air Transit & 14-Day Return Policies
16. `/privacy` — Privacy & Client Data Protection
17. `/terms` — Haute Couture Terms & Governance
18. `/admin` — Verified Atelier Management & CMS Console
