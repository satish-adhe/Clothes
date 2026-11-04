import React, { useState } from 'react';
import { RoutePath } from '../../types';
import { ArrowRight, CheckCircle2, Shield, Globe, RefreshCw } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: RoutePath) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#0b0b0b] text-[#B7B0A5] border-t border-[#1e1e1e] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#222222]">
          {/* Column 1 & 2: Brand Manifesto & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="font-serif text-3xl tracking-[0.25em] text-[#FAFAF8] uppercase block">
                NAMECLOTHES
              </span>
              <p className="text-xs uppercase tracking-[0.35em] text-[#B7B0A5] mt-1">
                Form • Identity • Expression
              </p>
            </div>

            <p className="text-sm text-[#8c867e] leading-relaxed max-w-sm">
              Architectural luxury tailoring engineered for movement and individual poise. 
              Designed between Tokyo and Milan; delivered worldwide in eco-certified garment modules.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-[0.2em] text-[#FAFAF8] font-medium mb-3">
                Join the Private Monograph
              </p>
              {newsletterSubscribed ? (
                <div className="flex items-center space-x-2 text-emerald-400 text-xs bg-[#161f19] border border-emerald-900/50 p-3">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>You have been added to the private seasonal release roster.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter client email address"
                    required
                    className="flex-1 bg-[#151515] border border-[#2a2a2a] px-4 py-3 text-sm text-[#FAFAF8] placeholder-[#555555] focus:outline-none focus:border-[#FAFAF8] transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-[#FAFAF8] text-[#101010] px-5 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#F5F1E9] transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
              <p className="text-[10px] text-[#555555] mt-2">
                By subscribing, you agree to receive editorial releases and confidential private previews.
              </p>
            </div>
          </div>

          {/* Column 3: The Collection */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#FAFAF8] font-semibold">
              The Silhouettes
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/shop')}
                  className="hover:text-[#FAFAF8] transition-colors cursor-pointer text-left"
                >
                  All Silhouettes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/collections/architectural')}
                  className="hover:text-[#FAFAF8] transition-colors cursor-pointer text-left"
                >
                  Architectural Series
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/collections/monolith')}
                  className="hover:text-[#FAFAF8] transition-colors cursor-pointer text-left"
                >
                  The Monolith Capsule
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/collections/capsule-01')}
                  className="hover:text-[#FAFAF8] transition-colors cursor-pointer text-left"
                >
                  Capsule 01: Fluidity
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/collections/hyper-minimal')}
                  className="hover:text-[#FAFAF8] transition-colors cursor-pointer text-left"
                >
                  Hyper-Minimal Essentials
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Services */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#FAFAF8] font-semibold">
              Client Concierge
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/account')}
                  className="hover:text-[#FAFAF8] transition-colors cursor-pointer text-left"
                >
                  Private Client Account
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/shipping-returns')}
                  className="hover:text-[#FAFAF8] transition-colors cursor-pointer text-left"
                >
                  Delivery &amp; Courier Logistics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/shipping-returns')}
                  className="hover:text-[#FAFAF8] transition-colors cursor-pointer text-left"
                >
                  Complimentary 14-Day Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-[#FAFAF8] transition-colors cursor-pointer text-left"
                >
                  Direct Atelier Assistance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-[#FAFAF8] transition-colors cursor-pointer text-left"
                >
                  Material Provenance &amp; Care
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Institutional & Legal */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#FAFAF8] font-semibold">
              Governance
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-[#FAFAF8] transition-colors cursor-pointer text-left"
                >
                  Brand Monograph
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/privacy')}
                  className="hover:text-[#FAFAF8] transition-colors cursor-pointer text-left"
                >
                  Privacy &amp; Data Trust
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms')}
                  className="hover:text-[#FAFAF8] transition-colors cursor-pointer text-left"
                >
                  Terms of Haute Couture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/admin')}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer text-left flex items-center space-x-1"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Atelier CMS Console</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Trust Indicators & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#666666] space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>Currency: INR (₹) • India &amp; Worldwide Flagship</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Encrypted 256-Bit SSL Atelier Checkout</span>
          </div>

          <div className="text-right">
            <p>© {new Date().getFullYear()} NAMECLOTHES Atelier. All rights reserved. Registered trademark.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
