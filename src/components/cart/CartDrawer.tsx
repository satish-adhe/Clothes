import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { CartItem, RoutePath } from '../../types';
import { formatINR } from '../../store/useCommerceStore';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  onUpdateQuantity: (productId: string, variantId: string, quantity: number) => void;
  onRemoveItem: (productId: string, variantId: string) => void;
  onNavigate: (path: RoutePath) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  shipping,
  tax,
  total,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#000000]/80 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121212] border-l border-[#242424] text-[#FAFAF8] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-[#242424] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#FAFAF8]" />
              <h2 className="font-serif text-xl tracking-wider uppercase">
                Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#888888] hover:text-[#FAFAF8] transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress towards complimentary express delivery */}
          <div className="bg-[#171717] px-6 py-3 border-b border-[#222222]">
            {subtotal >= 20000 ? (
              <p className="text-[11px] uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Complimentary Global Express Delivery Unlocked</span>
              </p>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] uppercase tracking-wider text-[#B7B0A5]">
                  <span>Add {formatINR(20000 - subtotal)} for Complimentary Delivery</span>
                  <span>{Math.round((subtotal / 20000) * 100)}%</span>
                </div>
                <div className="w-full bg-[#2a2a2a] h-1">
                  <div
                    className="bg-[#FAFAF8] h-1 transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / 20000) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className="w-16 h-16 rounded-full bg-[#1b1b1b] flex items-center justify-center text-[#777777]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl uppercase tracking-wider">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-[#888888] max-w-xs">
                  Discover our architectural silhouettes and contemporary tailoring.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('/shop');
                  }}
                  className="bg-[#FAFAF8] text-[#101010] px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#F5F1E9] transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.variant.id}`}
                  className="flex space-x-4 border-b border-[#202020] pb-6"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-20 h-28 object-cover bg-[#1c1c1c] border border-[#262626]"
                  />

                  {/* Info & Controls */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-base text-[#FAFAF8] leading-tight">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.variant.id)}
                          className="text-[#666666] hover:text-red-400 p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-[#8c867e] mt-1">
                        Size: <span className="text-[#FAFAF8] uppercase">{item.variant.size}</span> •{' '}
                        Color: <span className="text-[#FAFAF8]">{item.variant.color}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#333333] bg-[#161616]">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.variant.id,
                              item.quantity - 1
                            )
                          }
                          className="p-1.5 text-[#B7B0A5] hover:text-white cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 font-mono text-xs">{item.quantity}</span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.variant.id,
                              item.quantity + 1
                            )
                          }
                          className="p-1.5 text-[#B7B0A5] hover:text-white cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="font-mono text-sm text-[#FAFAF8] font-medium">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Totals & Checkout Button */}
          {items.length > 0 && (
            <div className="p-6 bg-[#161616] border-t border-[#262626] space-y-4">
              <div className="space-y-2 text-xs text-[#8c867e]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#FAFAF8]">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-mono text-[#FAFAF8]">
                    {shipping === 0 ? 'Complimentary' : formatINR(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated GST (12%)</span>
                  <span className="font-mono text-[#FAFAF8]">{formatINR(tax)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#292929] text-sm text-[#FAFAF8] font-medium">
                  <span>Total Due</span>
                  <span className="font-mono text-base">{formatINR(total)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('/checkout');
                  }}
                  className="w-full bg-[#FAFAF8] text-[#101010] py-3.5 px-4 text-xs uppercase tracking-[0.22em] font-semibold hover:bg-[#F5F1E9] transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
                >
                  <span>Proceed to Atelier Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onNavigate('/cart');
                  }}
                  className="w-full bg-transparent text-[#B7B0A5] hover:text-[#FAFAF8] py-2 text-xs uppercase tracking-[0.18em] transition-colors text-center cursor-pointer"
                >
                  View Full Bag &amp; Specifications
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
