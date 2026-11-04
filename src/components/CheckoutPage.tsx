import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle,
  Truck,
  CreditCard,
  Building,
  Smartphone,
  ChevronLeft
} from 'lucide-react';
import { CartItem, RoutePath, Order } from '../types';
import { formatINR } from '../store/useCommerceStore';
import confetti from 'canvas-confetti';

interface CheckoutPageProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  onNavigate: (path: RoutePath) => void;
  onCreateOrder: (orderData: any) => Order;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  subtotal,
  shipping,
  tax,
  total,
  onNavigate,
  onCreateOrder
}) => {
  const [formData, setFormData] = useState({
    fullName: 'Lady Anya Vane',
    email: 'anya.vane@atelier-client.com',
    phone: '+91 98200 12345',
    addressLine1: 'The Imperial Heights, Penthouse 42B',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400013',
    country: 'India'
  });

  const [paymentMethod, setPaymentMethod] = useState<'demo' | 'card' | 'upi' | 'netbanking'>('demo');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate secure server-side transaction & order generation
    setTimeout(() => {
      const order = onCreateOrder({
        items,
        subtotal,
        shipping,
        tax,
        total,
        shippingAddress: formData,
        paymentMethod
      });

      setCompletedOrder(order);
      setIsSubmitting(false);

      // Trigger celebratory aesthetic confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FAFAF8', '#B7B0A5', '#101010']
        });
      } catch (err) {
        // Safe confetti fallback
      }
    }, 1200);
  };

  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-8">
        <div className="w-16 h-16 bg-emerald-950/80 border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle className="w-8 h-8" />
        </div>

        <div className="space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B7B0A5] block">
            Atelier Order Confirmed
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#FAFAF8] uppercase tracking-wide">
            Acquisition Confirmed
          </h1>
          <p className="text-sm text-[#8c867e] max-w-md mx-auto">
            Order Reference: <span className="font-mono text-[#FAFAF8] font-bold">{completedOrder.id}</span>
          </p>
          <p className="text-xs text-[#8c867e] max-w-lg mx-auto leading-relaxed">
            A confirmation monograph and tracked courier dispatch dossier have been transmitted to{' '}
            <span className="text-[#FAFAF8]">{completedOrder.shippingAddress.email}</span>. Your garment will be individually inspected and wrapped in protective cedar garment sleeves before dispatch.
          </p>
        </div>

        {/* Order Summary Receipt Box */}
        <div className="bg-[#141414] border border-[#262626] p-6 text-left space-y-4 max-w-lg mx-auto">
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#FAFAF8] font-semibold border-b border-[#222222] pb-2">
            Order Monograph Breakdown
          </h3>
          <div className="space-y-2 text-xs text-[#8c867e]">
            {completedOrder.items.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{item.product.title} ({item.variant.size} • {item.variant.color}) x{item.quantity}</span>
                <span className="font-mono text-[#FAFAF8]">{formatINR(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#242424] pt-3 flex justify-between font-mono text-sm text-[#FAFAF8]">
            <span>Total Settlement</span>
            <span className="font-bold">{formatINR(completedOrder.total)}</span>
          </div>

          <div className="text-[11px] text-[#666666]">
            Shipping to: {completedOrder.shippingAddress.fullName}, {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.country}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onNavigate('/shop')}
            className="bg-[#FAFAF8] text-[#101010] px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#F5F1E9] transition-colors"
          >
            Continue Atelier Discovery
          </button>
          <button
            onClick={() => onNavigate('/account')}
            className="border border-[#333333] text-[#FAFAF8] px-6 py-3.5 text-xs uppercase tracking-[0.2em] hover:border-[#FAFAF8] transition-colors"
          >
            View in Client Account
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
        <h2 className="font-serif text-3xl uppercase tracking-wider text-[#FAFAF8]">
          Your bag is empty
        </h2>
        <p className="text-xs text-[#8c867e]">
          You need at least one garment silhouette in your bag to initiate atelier checkout.
        </p>
        <button
          onClick={() => onNavigate('/shop')}
          className="bg-[#FAFAF8] text-[#101010] px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#F5F1E9]"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Back button & Checkout Header */}
      <div className="flex items-center justify-between border-b border-[#222222] pb-6">
        <button
          onClick={() => onNavigate('/cart')}
          className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#888888] hover:text-[#FAFAF8] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Bag</span>
        </button>
        <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-emerald-400">
          <Lock className="w-3.5 h-3.5" />
          <span>Encrypted 256-Bit SSL Atelier Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Form & Payment */}
        <div className="lg:col-span-7 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Client Logistics Dossier */}
            <div className="bg-[#141414] border border-[#242424] p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[#242424] pb-4">
                <span className="font-mono text-xs text-[#777777]">01 / CLIENT SPECIFICATION</span>
                <span className="text-[10px] uppercase tracking-widest text-emerald-400">Discreet Air Transit</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#B7B0A5] block">
                    Full Client Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#2e2e2e] px-4 py-2.5 text-sm text-[#FAFAF8] focus:border-[#FAFAF8] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#B7B0A5] block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#2e2e2e] px-4 py-2.5 text-sm text-[#FAFAF8] focus:border-[#FAFAF8] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#B7B0A5] block">
                    Direct Telephone
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#2e2e2e] px-4 py-2.5 text-sm text-[#FAFAF8] focus:border-[#FAFAF8] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#B7B0A5] block">
                    Delivery Address &amp; Suite / Penthouse
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#2e2e2e] px-4 py-2.5 text-sm text-[#FAFAF8] focus:border-[#FAFAF8] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#B7B0A5] block">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#2e2e2e] px-4 py-2.5 text-sm text-[#FAFAF8] focus:border-[#FAFAF8] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#B7B0A5] block">
                    Postal Code / PIN
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#2e2e2e] px-4 py-2.5 text-sm text-[#FAFAF8] focus:border-[#FAFAF8] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Settlement Mode */}
            <div className="bg-[#141414] border border-[#242424] p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[#242424] pb-4">
                <span className="font-mono text-xs text-[#777777]">02 / SETTLEMENT METHOD</span>
                <span className="text-[10px] uppercase tracking-widest text-emerald-400">Zero Charge Demo Enabled</span>
              </div>

              {/* Mode Options */}
              <div className="space-y-3">
                <label className={`flex items-start p-4 border cursor-pointer transition-all ${paymentMethod === 'demo' ? 'border-[#FAFAF8] bg-[#1d1d1d]' : 'border-[#292929] bg-[#161616]'}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'demo'}
                    onChange={() => setPaymentMethod('demo')}
                    className="mt-1 mr-3 text-[#FAFAF8]"
                  />
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#FAFAF8] block">
                      Direct Atelier Demo Order (Instant Test Confirmation)
                    </span>
                    <span className="text-[11px] text-[#8c867e] block mt-0.5">
                      Recommended for review &amp; presentation. Generates full order documentation without billing card.
                    </span>
                  </div>
                </label>

                <label className={`flex items-start p-4 border cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[#FAFAF8] bg-[#1d1d1d]' : 'border-[#292929] bg-[#161616]'}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-1 mr-3 text-[#FAFAF8]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#FAFAF8]">
                        Credit / Debit Card (Mastercard / Visa / Amex)
                      </span>
                      <CreditCard className="w-4 h-4 text-[#888888]" />
                    </div>
                    <span className="text-[11px] text-[#8c867e] block mt-0.5">
                      Ready for live Razorpay / Stripe gateway webhook attachment.
                    </span>
                  </div>
                </label>

                <label className={`flex items-start p-4 border cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-[#FAFAF8] bg-[#1d1d1d]' : 'border-[#292929] bg-[#161616]'}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="mt-1 mr-3 text-[#FAFAF8]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#FAFAF8]">
                        UPI / Netbanking (India Instant Transfer)
                      </span>
                      <Smartphone className="w-4 h-4 text-[#888888]" />
                    </div>
                    <span className="text-[11px] text-[#8c867e] block mt-0.5">
                      Google Pay, PhonePe, Paytm, or HDFC/ICICI Netbanking.
                    </span>
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FAFAF8] text-[#101010] py-4 text-xs uppercase tracking-[0.22em] font-semibold hover:bg-[#F5F1E9] transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xl"
              >
                {isSubmitting ? (
                  <span>Securing Atelier Dispatch...</span>
                ) : (
                  <>
                    <span>Confirm Order &bull; {formatINR(total)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Order Review */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#141414] border border-[#242424] p-6 sm:p-8 space-y-6 sticky top-28">
            <h3 className="font-serif text-xl uppercase tracking-wider text-[#FAFAF8] border-b border-[#242424] pb-4">
              Atelier Summary ({items.length} Silhouettes)
            </h3>

            {/* Item list */}
            <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.variant.id}`} className="flex space-x-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-16 h-20 object-cover bg-[#1f1f1f]"
                  />
                  <div className="flex-1 text-xs">
                    <h4 className="font-serif text-sm text-[#FAFAF8]">{item.product.title}</h4>
                    <p className="text-[#8c867e]">
                      {item.variant.size} • {item.variant.color} • Qty: {item.quantity}
                    </p>
                    <span className="font-mono text-[#FAFAF8] font-medium block mt-1">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Financials */}
            <div className="border-t border-[#242424] pt-4 space-y-2 text-xs text-[#8c867e]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#FAFAF8]">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Insured Express Courier</span>
                <span className="font-mono text-[#FAFAF8]">
                  {shipping === 0 ? 'Complimentary' : formatINR(shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Goods &amp; Services Tax (12%)</span>
                <span className="font-mono text-[#FAFAF8]">{formatINR(tax)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#282828] text-base text-[#FAFAF8] font-medium">
                <span>Total Due</span>
                <span className="font-mono text-lg font-bold">{formatINR(total)}</span>
              </div>
            </div>

            <div className="bg-[#1b1b1b] p-3 border border-[#2a2a2a] text-[11px] text-[#777777] flex items-center space-x-2">
              <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct dispatch from Tokyo / Biella flagship atelier with tracking dossier.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
