import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Ruler,
  Share2,
  ChevronRight
} from 'lucide-react';
import { Product, ProductVariant, RoutePath } from '../../types';
import { Garment3DViewer } from '../three/Garment3DViewer';
import { ProductCard } from '../products/ProductCard';
import { formatINR } from '../../store/useCommerceStore';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigate: (path: RoutePath) => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onSelectProduct,
  onNavigate,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [view3D, setView3D] = useState(product.has3DModel);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(() => {
    return product.variants.find((v) => v.inStock) || product.variants[0];
  });
  const [quantity, setQuantity] = useState(1);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  // Related products
  const related = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedVariant || !selectedVariant.inStock) return;
    onAddToCart(product, selectedVariant, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#777777]">
        <button
          onClick={() => onNavigate('/')}
          className="hover:text-[#FAFAF8] transition-colors cursor-pointer"
        >
          Atelier
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          onClick={() => onNavigate('/shop')}
          className="hover:text-[#FAFAF8] transition-colors cursor-pointer"
        >
          Shop
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#FAFAF8] font-medium">{product.title}</span>
      </nav>

      {/* Main Product Stage: 2-Column Haute Couture Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Gallery / 3D Canvas Column */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual Display */}
          <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden bg-[#161616] border border-[#242424]">
            {view3D && product.has3DModel ? (
              <Garment3DViewer
                modelType={product.modelType || 'trench'}
                colorHex={selectedVariant.colorHex}
                productTitle={product.title}
                className="w-full h-full"
              />
            ) : (
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover object-center"
              />
            )}

            {/* Toggle 3D Atelier vs Photography View */}
            {product.has3DModel && (
              <button
                onClick={() => setView3D(!view3D)}
                className="absolute top-4 right-4 z-20 bg-[#161616]/95 border border-[#383838] px-3.5 py-2 text-xs uppercase tracking-[0.2em] text-[#FAFAF8] hover:bg-[#FAFAF8] hover:text-[#101010] transition-all flex items-center space-x-2 cursor-pointer shadow-xl"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{view3D ? 'View Editorial Photos' : 'Launch 3D Atelier'}</span>
              </button>
            )}
          </div>

          {/* Thumbnail Strip */}
          <div className="flex items-center space-x-3 overflow-x-auto pb-2">
            {product.has3DModel && (
              <button
                onClick={() => setView3D(true)}
                className={`relative w-20 h-24 border flex flex-col items-center justify-center p-2 transition-all cursor-pointer ${
                  view3D
                    ? 'border-[#FAFAF8] bg-[#222222]'
                    : 'border-[#2d2d2d] bg-[#161616] hover:border-[#444444]'
                }`}
              >
                <Sparkles className="w-5 h-5 text-emerald-400 mb-1" />
                <span className="text-[9px] uppercase tracking-wider text-[#FAFAF8]">3D Model</span>
              </button>
            )}

            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setView3D(false);
                  setSelectedImageIndex(idx);
                }}
                className={`relative w-20 h-24 border overflow-hidden transition-all cursor-pointer ${
                  !view3D && selectedImageIndex === idx
                    ? 'border-[#FAFAF8] ring-1 ring-[#FAFAF8]'
                    : 'border-[#2d2d2d] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Information & Commerce Action Column */}
        <div className="lg:col-span-5 space-y-8">
          {/* Header & Pricing */}
          <div className="space-y-2 border-b border-[#222222] pb-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-[#777777]">
              <span>{product.category}</span>
              <span>Collection: {product.collection}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#FAFAF8] leading-tight">
              {product.title}
            </h1>

            <p className="text-xs text-[#8c867e] tracking-wide">
              {product.subtitle}
            </p>

            <div className="pt-3 flex items-baseline space-x-3">
              <span className="font-mono text-2xl text-[#FAFAF8] font-medium">
                {formatINR(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="font-mono text-base text-[#666666] line-through">
                  {formatINR(product.compareAtPrice)}
                </span>
              )}
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 bg-emerald-950/40 px-2 py-0.5 border border-emerald-900/50">
                GST Included
              </span>
            </div>
          </div>

          {/* Variant Selector: Color */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs uppercase tracking-[0.2em]">
              <span className="text-[#B7B0A5]">Selected Colorway</span>
              <span className="text-[#FAFAF8] font-medium">{selectedVariant.color}</span>
            </div>

            <div className="flex items-center space-x-3">
              {product.variants
                .filter(
                  (v, idx, arr) => arr.findIndex((t) => t.color === v.color) === idx
                )
                .map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => {
                      const match = product.variants.find(
                        (v) => v.color === variant.color && v.size === selectedVariant.size
                      );
                      setSelectedVariant(match || variant);
                    }}
                    className={`p-1.5 border transition-all cursor-pointer ${
                      selectedVariant.color === variant.color
                        ? 'border-[#FAFAF8] bg-[#222222]'
                        : 'border-[#2d2d2d] bg-[#161616] hover:border-[#444444]'
                    }`}
                  >
                    <span
                      className="block w-6 h-6 rounded-none border border-black/50"
                      style={{ backgroundColor: variant.colorHex }}
                    />
                  </button>
                ))}
            </div>
          </div>

          {/* Variant Selector: Size & Size Guide */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs uppercase tracking-[0.2em]">
              <span className="text-[#B7B0A5]">Select Size</span>
              <button
                onClick={() => setShowSizeModal(true)}
                className="text-[#FAFAF8] hover:text-[#B7B0A5] underline flex items-center space-x-1 cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide (IN/CM)</span>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {(['XS', 'S', 'M', 'L', 'XL'] as const).map((size) => {
                const variantForSize = product.variants.find(
                  (v) => v.size === size && v.color === selectedVariant.color
                );
                const isAvailable = variantForSize ? variantForSize.inStock : false;
                const isSelected = selectedVariant.size === size;

                return (
                  <button
                    key={size}
                    disabled={!isAvailable}
                    onClick={() => variantForSize && setSelectedVariant(variantForSize)}
                    className={`py-3 text-xs uppercase tracking-wider font-mono border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#FAFAF8] bg-[#FAFAF8] text-[#101010] font-bold'
                        : isAvailable
                        ? 'border-[#2d2d2d] bg-[#161616] text-[#FAFAF8] hover:border-[#FAFAF8]'
                        : 'border-[#1f1f1f] bg-[#121212] text-[#444444] line-through cursor-not-allowed'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action CTAs: Add to Cart & Wishlist */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant.inStock}
              className={`w-full py-4 text-xs uppercase tracking-[0.22em] font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xl ${
                selectedVariant.inStock
                  ? 'bg-[#FAFAF8] text-[#101010] hover:bg-[#F5F1E9]'
                  : 'bg-[#222222] text-[#666666] cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {selectedVariant.inStock ? 'Acquire Silhouette' : 'Currently Unavailable'}
              </span>
            </button>

            <button
              onClick={() => onToggleWishlist(product.id)}
              className="w-full py-3.5 bg-transparent border border-[#2e2e2e] text-[#FAFAF8] hover:border-[#FAFAF8] text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-[#FAFAF8]' : ''}`} />
              <span>{isWishlisted ? 'Saved in Private Wishlist' : 'Add to Wishlist'}</span>
            </button>

            {addedToast && (
              <div className="bg-emerald-950/80 border border-emerald-800 text-emerald-300 p-3 text-xs uppercase tracking-wider flex items-center justify-between animate-fadeIn">
                <span className="flex items-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>Added {product.title} ({selectedVariant.size}) to Bag</span>
                </span>
                <button
                  onClick={() => onNavigate('/checkout')}
                  className="underline font-bold"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>

          {/* Atelier Craftsmanship & Material Details Accordions */}
          <div className="border-t border-[#222222] pt-6 space-y-4 text-xs">
            <div>
              <h4 className="uppercase tracking-[0.2em] text-[#FAFAF8] font-semibold mb-2">
                Silhouette Architecture
              </h4>
              <p className="text-[#8c867e] leading-relaxed">{product.description}</p>
            </div>

            <div className="pt-2">
              <h4 className="uppercase tracking-[0.2em] text-[#FAFAF8] font-semibold mb-2">
                Atelier Specifications
              </h4>
              <ul className="space-y-1.5 text-[#8c867e] list-disc list-inside">
                {product.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <h4 className="uppercase tracking-[0.2em] text-[#FAFAF8] font-semibold mb-1">
                Textile Provenance &amp; Care
              </h4>
              <p className="text-[#8c867e]">Composition: {product.fabricComposition}</p>
              <p className="text-[#8c867e]">Care: {product.careInstructions}</p>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#222222] text-[11px] text-[#777777]">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-[#B7B0A5]" />
              <span>Complimentary insured air courier</span>
            </div>
            <div className="flex items-center space-x-2">
              <RotateCcw className="w-4 h-4 text-[#B7B0A5]" />
              <span>14-day atelier exchange policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Curated Recommendations */}
      {related.length > 0 && (
        <section className="pt-16 border-t border-[#222222]">
          <h2 className="font-serif text-2xl sm:text-3xl uppercase tracking-wider text-[#FAFAF8] mb-8">
            Complementary Silhouettes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={onSelectProduct}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={false}
              />
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      {showSizeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141414] border border-[#333333] max-w-xl w-full p-6 sm:p-8 space-y-6 text-[#FAFAF8]">
            <div className="flex justify-between items-center border-b border-[#242424] pb-4">
              <h3 className="font-serif text-2xl uppercase tracking-wider">
                Atelier Sizing Standard
              </h3>
              <button
                onClick={() => setShowSizeModal(false)}
                className="text-[#777777] hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#8c867e]">
              Measurements correspond to true anatomical dimensions in inches and centimeters. Garments are cut with architectural ease for contemporary layering.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-[#2d2d2d] uppercase text-[#777777] tracking-wider font-mono">
                  <tr>
                    <th className="py-2">Size</th>
                    <th className="py-2">Chest (IN/CM)</th>
                    <th className="py-2">Waist (IN/CM)</th>
                    <th className="py-2">Shoulder</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222222] font-mono">
                  <tr>
                    <td className="py-2.5 font-bold">XS</td>
                    <td className="py-2.5">34-36 / 86-91</td>
                    <td className="py-2.5">28-30 / 71-76</td>
                    <td className="py-2.5">17.5 in</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold">S</td>
                    <td className="py-2.5">36-38 / 91-96</td>
                    <td className="py-2.5">30-32 / 76-81</td>
                    <td className="py-2.5">18.0 in</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold">M</td>
                    <td className="py-2.5">38-40 / 96-101</td>
                    <td className="py-2.5">32-34 / 81-86</td>
                    <td className="py-2.5">18.5 in</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold">L</td>
                    <td className="py-2.5">41-43 / 104-109</td>
                    <td className="py-2.5">35-37 / 89-94</td>
                    <td className="py-2.5">19.2 in</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold">XL</td>
                    <td className="py-2.5">44-46 / 112-117</td>
                    <td className="py-2.5">38-40 / 96-101</td>
                    <td className="py-2.5">20.0 in</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setShowSizeModal(false)}
              className="w-full bg-[#FAFAF8] text-[#101010] py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#F5F1E9]"
            >
              Return to Silhouette
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
