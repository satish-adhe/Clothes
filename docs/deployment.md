# Deployment & Production Verification — NAMECLOTHES

## 1. Local & Production Build Health
- **Build Status**: Verified via `npm run build` / `vite build`.
- **TypeScript Health**: 0 errors on `tsc --noEmit`.
- **Bundle Optimization**: Single-chunk vendor optimization, dynamic component rendering, on-demand WebGL lifecycle teardown.

## 2. Vercel & AI Studio Deployment Readiness
- **Production Host**: Vite SPA build output (`dist/`).
- **AI Studio Dev Preview**: `https://ais-dev-wzk6lilsnkrdn6xuhxukpi-752563525402.asia-southeast1.run.app`
- **Shared App URL**: `https://ais-pre-wzk6lilsnkrdn6xuhxukpi-752563525402.asia-southeast1.run.app`
- **Port**: 3000

## 3. Environment Variables
Defined in `.env.example`:
```env
# Optional Payment Gateway Webhook Keys
VITE_RAZORPAY_KEY_ID=""
VITE_STRIPE_PUBLIC_KEY=""

# Optional Analytics Integration
VITE_ANALYTICS_ENABLED="true"
```

## 4. Operational Checklist for Commercial Production
- [x] Zero-dependency 3D procedural engine (zero 404 network assets).
- [x] Responsive layout verified at 375px (mobile), 768px (tablet), and 1440px (desktop).
- [x] Persisted client cart, wishlist, and orders in localStorage.
- [x] Dynamic admin CMS with full CRUD catalog management.
- [ ] Connect production merchant gateway credentials (Razorpay or Stripe).
- [ ] Connect physical inventory warehouse ERP feed.
- [ ] Legal counsel sign-off on jurisdictional consumer terms.
