# NAMECLOTHES — The Future of Luxury Fashion Commerce

> **Contemporary fashion. Future-facing expression.**  
> An architectural digital flagship with real-time procedural 3D garment exploration, persistent commerce state, and atelier operations.

---

## 🚀 Live Flagship URLs
- **Live Preview Applet**: [https://ais-pre-wzk6lilsnkrdn6xuhxukpi-752563525402.asia-southeast1.run.app](https://ais-pre-wzk6lilsnkrdn6xuhxukpi-752563525402.asia-southeast1.run.app)
- **Local Dev Server**: `http://localhost:3000`

---

## 📦 Deploying to Vercel

This repository is pre-configured with `vercel.json` for zero-configuration, 1-click deployment on Vercel:

### Option 1: Vercel CLI (Quickest)
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to your Vercel account
vercel login

# 3. Deploy to production
vercel --prod
```

### Option 2: Deploy via GitHub / GitLab / Bitbucket
1. Push this codebase to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: NAMECLOTHES luxury 3D fashion digital flagship"
   git branch -M main
   git remote add origin https://github.com/<your-username>/nameclothes.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import the `nameclothes` repository.
4. Settings are automatically detected from `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

---

## 🛠️ Tech Stack & Architecture
- **Framework**: React 19, TypeScript, Vite 8.
- **Styling**: Tailwind CSS 4 with custom editorial font pairings (*Cormorant Garamond*, *Plus Jakarta Sans*, *Space Grotesk*).
- **3D Engine**: Three.js (r160+) with `RoomEnvironment` PBR reflection mapping, ACESFilmic tone mapping, and software WebGL safeguards.
- **State & Commerce**: Reactive local persistence for cart, wishlist, customer accounts, and order dispatches.
- **Admin CMS**: Dedicated administrative console for managing silhouettes, variants, and order statuses.
