import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  ChevronRight,
  Shield,
  Layers,
  Feather,
  RotateCw,
  Compass
} from 'lucide-react';
import { Product, RoutePath } from '../types';
import { Garment3DViewer } from './three/Garment3DViewer';
import { ProductCard } from './products/ProductCard';
import { COLLECTIONS_DATA } from '../data/products';

interface HomePageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigate: (path: RoutePath) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  onQuickAdd: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onSelectProduct,
  onNavigate,
  onToggleWishlist,
  wishlist,
  onQuickAdd
}) => {
  // Hero interactive 3D model selection
  const [selected3DColor, setSelected3DColor] = useState('#101010');
  const [active3DModel, setActive3DModel] = useState<'trench' | 'jacket' | 'coat'>('trench');

  // Featured pieces
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <div className="space-y-24 sm:space-y-36 pb-24">
      {/* SCENE 01: CINEMATIC HERO REVEAL */}
      <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16">
        {/* Subtle Architectural Grid Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#252525_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

        {/* Top Campaign Monogram Statement */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.3em] text-[#B7B0A5] mb-4">
            <span className="w-10 h-[1px] bg-[#B7B0A5]" />
            <span>Autumn / Winter 2026 Collection</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-[0.04em] font-light text-[#FAFAF8] leading-[0.95] uppercase">
                THE NEXT <br />
                <span className="italic font-normal">FORM</span> OF <br />
                EXPRESSION
              </h1>
            </div>

            <div className="lg:col-span-4 space-y-6 lg:pb-3">
              <p className="text-sm sm:text-base text-[#9a948b] leading-relaxed font-light">
                Architectural tailoring distilled to pure form. Sculptural silhouettes crafted from Japanese technical silks, Italian virgin wools, and cashmere.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('/shop')}
                  className="bg-[#FAFAF8] text-[#101010] px-7 py-4 text-xs uppercase tracking-[0.22em] font-semibold hover:bg-[#F5F1E9] transition-all flex items-center space-x-2 cursor-pointer shadow-lg"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('/collections')}
                  className="bg-transparent border border-[#3a3a3a] text-[#FAFAF8] px-6 py-4 text-xs uppercase tracking-[0.2em] hover:border-[#FAFAF8] transition-colors cursor-pointer"
                >
                  View Lookbook
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Editorial Panorama Banner */}
        <div className="relative z-10 max-w-7xl mx-auto w-full mt-12">
          <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden border border-[#222222]">
            <img
              src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1920&q=85"
              alt="NAMECLOTHES Autumn/Winter 2026 Campaign"
              className="w-full h-full object-cover object-center filter grayscale contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 flex items-center space-x-4">
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#FAFAF8] bg-[#101010]/80 px-3 py-1.5 border border-[#333333]">
                Monograph 01 • Tokyo Runway Debut
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Indication */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-[#666666]">
          <span>01 / 06 The Atelier</span>
          <span className="flex items-center space-x-2 animate-bounce">
            <span>Scroll to Experience 3D</span>
            <ChevronRight className="w-3.5 h-3.5 rotate-90" />
          </span>
        </div>
      </section>

      {/* SCENE 02: 3D INTERACTIVE ATELIER SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-[#262626] bg-[#121212] p-6 sm:p-10 lg:p-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Procedural 3D Garment Studio</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide text-[#FAFAF8] leading-tight">
                Architectural <br />
                <span className="italic font-light">Kinetic</span> Inspection
              </h2>

              <p className="text-sm text-[#9e988e] leading-relaxed">
                Step into our digital atelier. Rotate, zoom, and inspect our sculpted silhouettes with real-time studio softbox reflections, fabric drape dynamics, and procedural material physics.
              </p>

              {/* Garment Silhouette Selector */}
              <div className="space-y-3 pt-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#777777] block">
                  Select Garment Archetype
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setActive3DModel('trench')}
                    className={`py-2 px-3 text-[11px] uppercase tracking-wider border transition-all ${
                      active3DModel === 'trench'
                        ? 'border-[#FAFAF8] bg-[#FAFAF8] text-[#101010] font-semibold'
                        : 'border-[#2e2e2e] bg-[#181818] text-[#B7B0A5] hover:text-[#FAFAF8]'
                    }`}
                  >
                    Axiom Trench
                  </button>
                  <button
                    onClick={() => setActive3DModel('jacket')}
                    className={`py-2 px-3 text-[11px] uppercase tracking-wider border transition-all ${
                      active3DModel === 'jacket'
                        ? 'border-[#FAFAF8] bg-[#FAFAF8] text-[#101010] font-semibold'
                        : 'border-[#2e2e2e] bg-[#181818] text-[#B7B0A5] hover:text-[#FAFAF8]'
                    }`}
                  >
                    Monolith Blazer
                  </button>
                  <button
                    onClick={() => setActive3DModel('coat')}
                    className={`py-2 px-3 text-[11px] uppercase tracking-wider border transition-all ${
                      active3DModel === 'coat'
                        ? 'border-[#FAFAF8] bg-[#FAFAF8] text-[#101010] font-semibold'
                        : 'border-[#2e2e2e] bg-[#181818] text-[#B7B0A5] hover:text-[#FAFAF8]'
                    }`}
                  >
                    Vesper Coat
                  </button>
                </div>
              </div>

              {/* Atelier Fabric Colorways */}
              <div className="space-y-3 pt-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#777777] block">
                  Atelier Textile Colorway
                </span>
                <div className="flex items-center space-x-3">
                  {[
                    { name: 'Obsidian Black', hex: '#101010' },
                    { name: 'Warm Ivory', hex: '#F5F1E9' },
                    { name: 'Muted Stone', hex: '#B7B0A5' },
                    { name: 'Deep Charcoal', hex: '#252525' }
                  ].map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setSelected3DColor(color.hex)}
                      className={`group flex items-center space-x-2 py-1.5 px-3 border transition-all ${
                        selected3DColor === color.hex
                          ? 'border-[#FAFAF8] bg-[#222222]'
                          : 'border-[#2d2d2d] bg-[#161616] hover:border-[#444444]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/50"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[10px] uppercase tracking-wider text-[#FAFAF8]">
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Link to Examine Full Silhouette */}
              <div className="pt-4">
                <button
                  onClick={() => {
                    const match = products.find((p) => p.modelType === active3DModel);
                    if (match) onSelectProduct(match);
                    else onNavigate('/shop');
                  }}
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#FAFAF8] hover:text-[#B7B0A5] transition-colors border-b border-[#FAFAF8] pb-1 cursor-pointer"
                >
                  <span>View Specifications &amp; Craft Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Interactive 3D Canvas Column */}
            <div className="lg:col-span-7">
              <Garment3DViewer
                modelType={active3DModel}
                colorHex={selected3DColor}
                productTitle={active3DModel.toUpperCase()}
                className="h-[460px] sm:h-[540px] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 03: FEATURED CAPSULE COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#222222]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B7B0A5] block mb-2">
              Curated Wardrobe
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAFAF8] uppercase tracking-wide">
              The Flagship Capsule
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/shop')}
            className="mt-4 md:mt-0 text-xs uppercase tracking-[0.2em] text-[#FAFAF8] hover:text-[#B7B0A5] flex items-center space-x-1 transition-colors cursor-pointer"
          >
            <span>View All 12 Silhouettes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.includes(product.id)}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      </section>

      {/* SCENE 04: EDITORIAL FASHION STORY (MONOGRAPH) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#141414] border border-[#262626] p-8 sm:p-14 lg:p-20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Diptych */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] overflow-hidden bg-[#1c1c1c]">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=85"
                  alt="Tailoring craftsmanship"
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden bg-[#1c1c1c] mt-8">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85"
                  alt="Sculptural drape"
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            {/* Editorial Copy */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-[#B7B0A5] block">
                Editorial Monograph • No. 04
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#FAFAF8] leading-[1.05] uppercase">
                FORM IS NOT AN <br />
                ORNAMENT; IT IS <br />
                <span className="italic font-light">ANATOMY</span>.
              </h2>
              <p className="text-sm text-[#9c958b] leading-relaxed">
                At NAMECLOTHES, our garments are engineered as spatial architectures. We reject fleeting trend cycles in pursuit of enduring proportions. Each piece balances the aerodynamic fluidity of Japanese technical silk with the grounded weight of Italian virgin wool.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#262626]">
                <div>
                  <span className="font-serif text-2xl text-[#FAFAF8] block">320 GSM</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#777777]">
                    Technical Silk Twill
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl text-[#FAFAF8] block">100%</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#777777]">
                    Biella Virgin Wool
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl text-[#FAFAF8] block">0-Waste</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#777777]">
                    Wholegarment Knits
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/about')}
                  className="bg-[#FAFAF8] text-[#101010] px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#F5F1E9] transition-colors cursor-pointer"
                >
                  Read Atelier Philosophy
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 05: NEW ARRIVALS HORIZONTAL EXPERIENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-[#222222]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B7B0A5] block mb-2">
              Fresh Additions
            </span>
            <h2 className="font-serif text-3xl text-[#FAFAF8] uppercase tracking-wide">
              New Silhouettes
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/shop')}
            className="text-xs uppercase tracking-[0.2em] text-[#B7B0A5] hover:text-[#FAFAF8] transition-colors cursor-pointer"
          >
            Explore Complete Roster
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.includes(product.id)}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      </section>

      {/* SCENE 06: BRAND PHILOSOPHY & PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-b border-[#222222] py-16">
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#777777] block">01 / ARCHITECTURE</span>
            <h3 className="font-serif text-2xl text-[#FAFAF8] uppercase">
              Structural Tailoring
            </h3>
            <p className="text-xs text-[#8c867e] leading-relaxed">
              Every garment begins from structural drawings rather than decorative patterns, creating silhouettes that assert presence and posture.
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-xs text-[#777777] block">02 / PROVENANCE</span>
            <h3 className="font-serif text-2xl text-[#FAFAF8] uppercase">
              Material Origin
            </h3>
            <p className="text-xs text-[#8c867e] leading-relaxed">
              Woven exclusively in historic heritage mills across Biella, Como, and Okayama, pairing natural luxury yarns with nanotech resistance.
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-xs text-[#777777] block">03 / SUSTAINED FORM</span>
            <h3 className="font-serif text-2xl text-[#FAFAF8] uppercase">
              Modular Longevity
            </h3>
            <p className="text-xs text-[#8c867e] leading-relaxed">
              Removable storm flaps, magnetic hardware, and bonded split seams engineered for multi-seasonal wearability across global metropolises.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
