import React, { useState } from 'react';
import { RoutePath } from '../types';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface StaticPagesProps {
  pageType: 'about' | 'contact' | 'shipping' | 'privacy' | 'terms' | 'wishlist' | 'cart' | 'account' | 'collections';
  onNavigate: (path: RoutePath) => void;
  wishlistProducts?: any[];
  onSelectProduct?: (product: any) => void;
  onToggleWishlist?: (productId: string) => void;
  cartItems?: any[];
  cartSubtotal?: number;
  shippingFee?: number;
  taxFee?: number;
  cartTotal?: number;
  onUpdateCartQuantity?: (pid: string, vid: string, q: number) => void;
  onRemoveCartItem?: (pid: string, vid: string) => void;
  orders?: any[];
}

export const StaticPages: React.FC<StaticPagesProps> = ({
  pageType,
  onNavigate,
  wishlistProducts = [],
  onSelectProduct,
  onToggleWishlist,
  cartItems = [],
  cartSubtotal = 0,
  shippingFee = 0,
  taxFee = 0,
  cartTotal = 0,
  onUpdateCartQuantity,
  onRemoveCartItem,
  orders = []
}) => {
  const [contactSent, setContactSent] = useState(false);

  // 1. ABOUT PAGE
  if (pageType === 'about') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="space-y-3 border-b border-[#242424] pb-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B7B0A5] block">
            Brand Monograph
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#FAFAF8] uppercase tracking-wide">
            Wear What Comes Next
          </h1>
          <p className="text-sm text-[#8c867e] leading-relaxed">
            NAMECLOTHES was established on a radical premise: that contemporary garments should possess the architectural integrity of spatial structures and the aerodynamic poise of kinetic sculpture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <img
            src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=85"
            alt="Atelier drape"
            className="w-full aspect-[4/5] object-cover bg-[#1c1c1c] border border-[#262626]"
          />
          <div className="space-y-6 text-sm text-[#9c958b] leading-relaxed">
            <h3 className="font-serif text-2xl text-[#FAFAF8] uppercase">
              The Architecture of Drape
            </h3>
            <p>
              Traditional luxury brands repeat heritage ornament. We construct future-facing silhouettes from first principles: the human gait, atmospheric conditions, and tactile resonance.
            </p>
            <p>
              Each pattern is developed in our Tokyo atelier and woven in partnership with heritage Italian mills in Biella and Como. We use 100% natural virgin fibers paired with nanotech weather-resistance to create armor for modern life.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. CONTACT CONCIERGE PAGE
  if (pageType === 'contact') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="space-y-3 border-b border-[#242424] pb-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B7B0A5] block">
            Client Concierge
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#FAFAF8] uppercase tracking-wide">
            Direct Atelier Dialogue
          </h1>
          <p className="text-sm text-[#8c867e]">
            Our concierge team is available to assist with bespoke sizing consultations, private appointments, and garment provenance inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-6 text-xs text-[#8c867e]">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#FAFAF8] block font-semibold">
                Tokyo Flagship Atelier
              </span>
              <p className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#B7B0A5]" />
                <span>5-7-22 Minami-Aoyama, Minato-ku, Tokyo 107-0062</span>
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#FAFAF8] block font-semibold">
                Direct Communications
              </span>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#B7B0A5]" />
                <span>concierge@nameclothes.luxury</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#B7B0A5]" />
                <span>+81 3 5410 8820 (Mon - Sat, 10:00 - 19:00 JST)</span>
              </p>
            </div>
          </div>

          <div className="md:col-span-7 bg-[#141414] border border-[#242424] p-6 sm:p-8">
            {contactSent ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-serif text-xl text-[#FAFAF8]">Inquiry Received</h4>
                <p className="text-xs text-[#8c867e]">
                  An atelier concierge specialist will review your note and respond within 12 business hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSent(true);
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="text-[#888888] uppercase tracking-wider block mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Lady / Lord / Mx."
                    className="w-full bg-[#181818] border border-[#2f2f2f] p-3 text-[#FAFAF8] focus:border-[#FAFAF8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#888888] uppercase tracking-wider block mb-1">
                    Client Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="client@domain.com"
                    className="w-full bg-[#181818] border border-[#2f2f2f] p-3 text-[#FAFAF8] focus:border-[#FAFAF8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#888888] uppercase tracking-wider block mb-1">
                    Inquiry Detail
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Detail your inquiry regarding silhouettes, bespoke tailoring, or appointments..."
                    className="w-full bg-[#181818] border border-[#2f2f2f] p-3 text-[#FAFAF8] focus:border-[#FAFAF8] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FAFAF8] text-[#101010] py-3 uppercase tracking-widest font-semibold hover:bg-[#F5F1E9] transition-colors"
                >
                  Transmit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. SHIPPING & RETURNS
  if (pageType === 'shipping') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="space-y-3 border-b border-[#242424] pb-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B7B0A5] block">
            Client Logistics
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#FAFAF8] uppercase tracking-wide">
            Delivery &amp; Courier Policy
          </h1>
        </div>

        <div className="space-y-6 text-xs text-[#8c867e] leading-relaxed">
          <div className="bg-[#141414] border border-[#242424] p-6 space-y-2">
            <h3 className="font-serif text-lg text-[#FAFAF8] uppercase">
              Complimentary Global Air Transit
            </h3>
            <p>
              We provide complimentary insured express air transit for all orders above ₹20,000. All orders are packed in signature breathable cedar garment bags inside custom matte black magnetic boxes.
            </p>
          </div>

          <div className="bg-[#141414] border border-[#242424] p-6 space-y-2">
            <h3 className="font-serif text-lg text-[#FAFAF8] uppercase">
              14-Day Complimentary Exchange Window
            </h3>
            <p>
              If a silhouette does not harmonize with your wardrobe, return or exchange it within 14 calendar days of receipt. Items must remain unwashed and unworn with all atelier tags intact.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 4. PRIVACY POLICY
  if (pageType === 'privacy') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-xs text-[#8c867e] leading-relaxed">
        <h1 className="font-serif text-4xl text-[#FAFAF8] uppercase tracking-wide border-b border-[#242424] pb-4">
          Privacy Policy &amp; Data Responsibility
        </h1>
        <p>
          At NAMECLOTHES, client confidentiality is foundational. We never sell, rent, or trade client telemetry, financial records, or sizing measurements to third-party ad networks.
        </p>
        <p>
          All payment and checkout interactions are encrypted with TLS 1.3 cryptographic protocols. Client profiles and order records are stored with strict access controls.
        </p>
      </div>
    );
  }

  // 5. TERMS OF SERVICE
  if (pageType === 'terms') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-xs text-[#8c867e] leading-relaxed">
        <h1 className="font-serif text-4xl text-[#FAFAF8] uppercase tracking-wide border-b border-[#242424] pb-4">
          Terms &amp; Conditions
        </h1>
        <p>
          By interacting with the NAMECLOTHES digital flagship or commissioning garments, you agree to our standard terms of commercial acquisition.
        </p>
        <p>
          All designs, photography, 3D models, and trademarks are proprietary property of NAMECLOTHES Atelier. Commercial replication without explicit written license is prohibited.
        </p>
      </div>
    );
  }

  // 6. WISHLIST PAGE
  if (pageType === 'wishlist') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="border-b border-[#242424] pb-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B7B0A5] block mb-2">
            Private Curation
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#FAFAF8] uppercase tracking-wide">
            Saved Silhouettes ({wishlistProducts.length})
          </h1>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <p className="font-serif text-xl uppercase tracking-wider text-[#FAFAF8]">
              Your wishlist contains no saved pieces
            </p>
            <p className="text-xs text-[#777777]">
              Explore our current collections and click the heart icon to curate your personal wardrobe.
            </p>
            <button
              onClick={() => onNavigate('/shop')}
              className="bg-[#FAFAF8] text-[#101010] px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#F5F1E9]"
            >
              Browse Silhouettes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((p) => (
              <div key={p.id} className="bg-[#141414] border border-[#242424] p-4 flex flex-col justify-between">
                <img
                  src={p.images[0]}
                  alt={p.title}
                  onClick={() => onSelectProduct && onSelectProduct(p)}
                  className="w-full aspect-[3/4] object-cover cursor-pointer mb-3"
                />
                <div>
                  <h4
                    onClick={() => onSelectProduct && onSelectProduct(p)}
                    className="font-serif text-base text-[#FAFAF8] cursor-pointer hover:underline"
                  >
                    {p.title}
                  </h4>
                  <p className="font-mono text-sm text-[#FAFAF8] mt-1">₹{p.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex gap-2 mt-4 pt-3 border-t border-[#222222]">
                  <button
                    onClick={() => onSelectProduct && onSelectProduct(p)}
                    className="flex-1 bg-[#FAFAF8] text-[#101010] py-2 text-[10px] uppercase font-bold tracking-wider"
                  >
                    Examine
                  </button>
                  <button
                    onClick={() => onToggleWishlist && onToggleWishlist(p.id)}
                    className="px-3 border border-[#333333] text-[#888888] hover:text-white text-xs"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 7. CLIENT ACCOUNT PORTAL
  if (pageType === 'account') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="border-b border-[#242424] pb-6 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B7B0A5] block">
            Private Portal
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#FAFAF8] uppercase tracking-wide">
            Client Account &amp; Order Dossier
          </h1>
        </div>

        <div className="bg-[#141414] border border-[#242424] p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-[#242424] pb-4">
            <div>
              <h3 className="font-serif text-xl text-[#FAFAF8]">Lady Anya Vane</h3>
              <p className="text-xs text-[#8c867e]">anya.vane@atelier-client.com • Tier: Private Client</p>
            </div>
            <span className="px-3 py-1 bg-[#1e1e1e] border border-[#333333] text-[10px] uppercase font-mono text-emerald-400">
              Verified Atelier Tier
            </span>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#FAFAF8] font-semibold mb-4">
              Recorded Dispatches ({orders.length})
            </h4>

            {orders.length === 0 ? (
              <p className="text-xs text-[#777777] py-6 text-center">
                No orders recorded on this device yet. Complete an order to view dispatch updates.
              </p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="p-4 bg-[#191919] border border-[#282828] text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[#FAFAF8] font-bold">{order.id}</span>
                      <span className="text-[10px] uppercase bg-emerald-950 text-emerald-300 px-2 py-0.5 font-mono">
                        {order.status}
                      </span>
                    </div>
                    <div className="text-[#8c867e]">
                      {order.items.map((i: any) => `${i.product.title} (${i.variant.size})`).join(', ')}
                    </div>
                    <div className="flex justify-between pt-2 border-t border-[#262626] font-mono text-[#FAFAF8]">
                      <span>Settled</span>
                      <span>₹{order.total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 8. CART FULL PAGE
  if (pageType === 'cart') {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="border-b border-[#242424] pb-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B7B0A5] block mb-2">
            Wardrobe Bag
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#FAFAF8] uppercase tracking-wide">
            Shopping Bag ({cartItems.length} Silhouettes)
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <p className="font-serif text-xl uppercase tracking-wider text-[#FAFAF8]">
              Your shopping bag is currently empty
            </p>
            <button
              onClick={() => onNavigate('/shop')}
              className="bg-[#FAFAF8] text-[#101010] px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#F5F1E9]"
            >
              Explore Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-6">
              {cartItems.map((item) => (
                <div key={`${item.product.id}-${item.variant.id}`} className="flex space-x-6 p-4 bg-[#141414] border border-[#242424]">
                  <img src={item.product.images[0]} alt="" className="w-24 h-32 object-cover bg-[#1c1c1c]" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-lg text-[#FAFAF8]">{item.product.title}</h4>
                      <p className="text-xs text-[#8c867e] mt-1">
                        Size: {item.variant.size} • Color: {item.variant.color}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-mono text-base text-[#FAFAF8]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => onRemoveCartItem && onRemoveCartItem(item.product.id, item.variant.id)}
                        className="text-xs text-red-400 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4 bg-[#141414] border border-[#242424] p-6 space-y-4 h-fit">
              <h3 className="font-serif text-lg uppercase text-[#FAFAF8]">Order Settlement</h3>
              <div className="space-y-2 text-xs text-[#8c867e]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#FAFAF8]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono text-[#FAFAF8]">
                    {shippingFee === 0 ? 'Complimentary' : `₹${shippingFee.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>GST (12%)</span>
                  <span className="font-mono text-[#FAFAF8]">₹{taxFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#252525] text-base text-[#FAFAF8] font-bold">
                  <span>Total</span>
                  <span className="font-mono">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('/checkout')}
                className="w-full bg-[#FAFAF8] text-[#101010] py-3.5 text-xs uppercase tracking-widest font-semibold hover:bg-[#F5F1E9]"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};
