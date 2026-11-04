import React, { useState } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Product, RoutePath } from '../../types';
import { formatINR } from '../../store/useCommerceStore';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigate: (path: RoutePath) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.collection.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const suggestedTerms = [
    'Trench',
    'Blazer',
    'Cashmere',
    'Silk Dress',
    'Architectural',
    'Monolith'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#000000]/85 backdrop-blur-md transition-opacity"
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 lg:p-12">
        <div className="relative w-full max-w-3xl bg-[#141414] border border-[#2d2d2d] shadow-2xl p-6 sm:p-8 space-y-6">
          {/* Search Header Bar */}
          <div className="flex items-center justify-between border-b border-[#292929] pb-4">
            <div className="flex items-center space-x-3 flex-1">
              <Search className="w-5 h-5 text-[#888888]" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search silhouettes, materials, or collections..."
                className="w-full bg-transparent text-lg sm:text-xl text-[#FAFAF8] placeholder-[#555555] focus:outline-none"
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#777777] hover:text-[#FAFAF8] transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Suggested Quick Searches */}
          <div className="flex items-center flex-wrap gap-2 text-xs">
            <span className="text-[#666666] uppercase tracking-wider text-[10px]">
              Suggestions:
            </span>
            {suggestedTerms.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-3 py-1 bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-[#333333] text-[#B7B0A5] hover:text-[#FAFAF8] transition-colors cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Search Results Display */}
          <div className="max-h-[60vh] overflow-y-auto space-y-3 pt-2">
            {query.trim() && filtered.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <p className="font-serif text-lg text-[#FAFAF8]">
                  No silhouettes found for &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-[#777777]">
                  Try searching for outerwear, wool, silk, or architectural tailoring.
                </p>
              </div>
            ) : filtered.length > 0 ? (
              filtered.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="group flex items-center space-x-4 p-3 bg-[#191919] hover:bg-[#222222] border border-[#262626] cursor-pointer transition-all"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-16 h-20 object-cover bg-[#222222]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-serif text-base text-[#FAFAF8] group-hover:text-[#B7B0A5] transition-colors">
                        {product.title}
                      </h4>
                      {product.has3DModel && (
                        <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-mono">
                          3D
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#8c867e] line-clamp-1">{product.subtitle}</p>
                    <p className="text-[10px] uppercase tracking-wider text-[#666666] mt-1">
                      {product.category} • {product.collection}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm text-[#FAFAF8] font-medium block">
                      {formatINR(product.price)}
                    </span>
                    <span className="text-[10px] text-[#777777] uppercase tracking-wider group-hover:text-[#FAFAF8] transition-colors inline-flex items-center space-x-1 mt-1">
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-xs text-[#666666]">
                Enter a search term above or browse our curated collections.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
