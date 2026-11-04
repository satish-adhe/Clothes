import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Sparkles } from 'lucide-react';
import { Product, RoutePath } from '../types';
import { ProductCard } from './products/ProductCard';

interface ShopPageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigate: (path: RoutePath) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  initialCategory?: string;
  initialCollection?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  onSelectProduct,
  onNavigate,
  onToggleWishlist,
  wishlist,
  initialCategory = 'all',
  initialCollection = 'all'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollection);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [filter3DOnly, setFilter3DOnly] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('all');

  const categories = [
    { label: 'All Silhouettes', value: 'all' },
    { label: 'Outerwear', value: 'outerwear' },
    { label: 'Tailoring', value: 'tailoring' },
    { label: 'Knitwear', value: 'knitwear' },
    { label: 'Trousers', value: 'trousers' },
    { label: 'Dresses', value: 'dresses' },
    { label: 'Accessories', value: 'accessories' }
  ];

  const collections = [
    { label: 'All Collections', value: 'all' },
    { label: 'Architectural', value: 'architectural' },
    { label: 'The Monolith', value: 'monolith' },
    { label: 'Capsule 01: Fluidity', value: 'capsule-01' },
    { label: 'Hyper-Minimal', value: 'hyper-minimal' }
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (selectedCollection !== 'all' && p.collection !== selectedCollection) return false;
        if (filter3DOnly && !p.has3DModel) return false;
        if (selectedSize !== 'all') {
          const hasSize = p.variants.some((v) => v.size === selectedSize && v.inStock);
          if (!hasSize) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return 0; // featured default
      });
  }, [products, selectedCategory, selectedCollection, filter3DOnly, selectedSize, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header Banner */}
      <div className="border-b border-[#222222] pb-8 space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[#B7B0A5] block">
          Current Wardrobe Catalog
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#FAFAF8] uppercase tracking-wide">
          All Silhouettes ({filteredProducts.length})
        </h1>
        <p className="text-sm text-[#8c867e] max-w-2xl">
          Constructed with architectural intention. Filter by functional category, tactile collection, or explore models directly in 3D interactive space.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-[#141414] border border-[#242424] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-[#FAFAF8] text-[#101010]'
                  : 'bg-[#1b1b1b] text-[#B7B0A5] hover:text-[#FAFAF8] border border-[#2c2c2c]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Right Filter Actions */}
        <div className="flex items-center flex-wrap gap-3">
          {/* 3D Filter Toggle */}
          <button
            onClick={() => setFilter3DOnly(!filter3DOnly)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs uppercase tracking-wider border cursor-pointer transition-all ${
              filter3DOnly
                ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                : 'border-[#2e2e2e] bg-[#1a1a1a] text-[#B7B0A5] hover:text-[#FAFAF8]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>3D Interactive Only</span>
          </button>

          {/* Collection Dropdown */}
          <select
            value={selectedCollection}
            onChange={(e) => setSelectedCollection(e.target.value)}
            className="bg-[#1a1a1a] border border-[#2e2e2e] text-[#B7B0A5] text-xs uppercase tracking-wider px-3 py-2 focus:outline-none"
          >
            {collections.map((col) => (
              <option key={col.value} value={col.value} className="bg-[#141414]">
                {col.label}
              </option>
            ))}
          </select>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#1a1a1a] border border-[#2e2e2e] text-[#B7B0A5] text-xs uppercase tracking-wider px-3 py-2 focus:outline-none"
          >
            <option value="featured" className="bg-[#141414]">Featured Order</option>
            <option value="newest" className="bg-[#141414]">Newest Releases</option>
            <option value="price-asc" className="bg-[#141414]">Price: Low to High</option>
            <option value="price-desc" className="bg-[#141414]">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center space-y-4">
          <p className="font-serif text-2xl text-[#FAFAF8] uppercase tracking-wider">
            No Silhouettes Match Selected Filters
          </p>
          <p className="text-xs text-[#777777]">
            Try clearing category or collection filters to reveal the full wardrobe.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedCollection('all');
              setFilter3DOnly(false);
              setSelectedSize('all');
            }}
            className="bg-[#FAFAF8] text-[#101010] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold hover:bg-[#F5F1E9]"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.includes(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
