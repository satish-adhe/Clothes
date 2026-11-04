import React from 'react';
import { Heart, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { formatINR } from '../../store/useCommerceStore';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onQuickAdd?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onToggleWishlist,
  isWishlisted,
  onQuickAdd
}) => {
  return (
    <div className="group relative flex flex-col bg-[#141414] border border-[#222222] hover:border-[#3d3d3d] transition-all duration-500 overflow-hidden">
      {/* Product Image Frame */}
      <div
        onClick={() => onSelect(product)}
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#181818] cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="img-editorial h-full w-full object-cover object-center"
        />

        {/* Hover Secondary Angle Cross-Fade if available */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.title} alternate angle`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          />
        )}

        {/* Badges: 3D Atelier Available or New Arrival */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.has3DModel && (
            <span className="bg-[#101010]/90 border border-[#333333] text-[#FAFAF8] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-medium flex items-center space-x-1">
              <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
              <span>3D Interactive</span>
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-[#FAFAF8] text-[#101010] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-bold">
              New Silhouette
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-none transition-all z-10 cursor-pointer ${
            isWishlisted
              ? 'bg-[#FAFAF8] text-[#101010]'
              : 'bg-[#101010]/80 text-[#FAFAF8] hover:bg-[#FAFAF8] hover:text-[#101010] border border-[#333333]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View / Inspect overlay button */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#101010]/90 via-[#101010]/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="flex-1 bg-[#FAFAF8] text-[#101010] py-2 px-3 text-[11px] uppercase tracking-[0.18em] font-medium hover:bg-[#F5F1E9] transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Examine Piece</span>
          </button>
          {onQuickAdd && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickAdd(product);
              }}
              className="bg-[#242424] text-[#FAFAF8] border border-[#3a3a3a] py-2 px-3 text-[11px] uppercase tracking-[0.18em] hover:bg-[#333333] transition-colors cursor-pointer"
              title="Quick Add to Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-[#131313]">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#888888]">
            <span>{product.category}</span>
            <span>{product.collection}</span>
          </div>

          <h3
            onClick={() => onSelect(product)}
            className="font-serif text-lg text-[#FAFAF8] group-hover:text-[#B7B0A5] transition-colors cursor-pointer tracking-wide"
          >
            {product.title}
          </h3>

          <p className="text-xs text-[#8c867e] line-clamp-1">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Variant Color Swatches */}
        <div className="mt-4 pt-3 border-t border-[#1f1f1f] flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="font-mono text-sm sm:text-base text-[#FAFAF8] font-medium">
              {formatINR(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="font-mono text-xs text-[#666666] line-through">
                {formatINR(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Color Indicators */}
          <div className="flex items-center space-x-1.5">
            {Array.from(new Set(product.variants.map((v) => v.colorHex))).map((hex, idx) => (
              <span
                key={idx}
                className="w-2.5 h-2.5 rounded-full border border-[#444444]"
                style={{ backgroundColor: hex }}
                title="Color variant"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
