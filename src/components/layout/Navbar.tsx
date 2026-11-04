import React, { useState } from 'react';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  User,
  ShieldCheck,
  Compass,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { RoutePath } from '../../types';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: RoutePath) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCartDrawer: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCartDrawer,
  onOpenSearch
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks: { label: string; path: RoutePath }[] = [
    { label: 'Shop All', path: '/shop' },
    { label: 'Collections', path: '/collections' },
    { label: 'Architectural', path: '/collections/architectural' },
    { label: 'Monolith', path: '/collections/monolith' },
    { label: 'Atelier Story', path: '/about' }
  ];

  const handleLinkClick = (path: RoutePath) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#101010]/95 backdrop-blur-md border-b border-[#222222] transition-all">
      {/* Top High-Fashion Announcement Bar */}
      <div className="bg-[#171717] border-b border-[#262626] py-1.5 px-4 text-center">
        <p className="text-[11px] tracking-[0.25em] uppercase text-[#B7B0A5] font-mono-code flex items-center justify-center gap-2">
          <span>Complimentary Global Express Delivery on Orders Above ₹20,000</span>
          <span className="hidden md:inline text-white/40">•</span>
          <span className="hidden md:inline text-[#FAFAF8]">Autumn/Winter 2026 Collection Available</span>
        </p>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#FAFAF8] hover:text-[#B7B0A5] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Left Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`text-[12px] uppercase tracking-[0.2em] font-medium transition-colors relative py-1 cursor-pointer ${
                    isActive ? 'text-[#FAFAF8]' : 'text-[#B7B0A5] hover:text-[#FAFAF8]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#FAFAF8]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Center Brand Identity / Wordmark */}
          <div className="flex-1 lg:flex-none text-center">
            <button
              onClick={() => handleLinkClick('/')}
              className="group cursor-pointer inline-block text-left sm:text-center"
            >
              <span className="block font-serif text-2xl sm:text-3xl tracking-[0.28em] font-light text-[#FAFAF8] uppercase transition-all duration-300 group-hover:tracking-[0.32em]">
                NAMECLOTHES
              </span>
              <span className="block text-[9px] uppercase tracking-[0.45em] text-[#B7B0A5] -mt-0.5">
                Contemporary Atelier
              </span>
            </button>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#FAFAF8] hover:text-[#B7B0A5] transition-colors cursor-pointer"
              aria-label="Search catalog"
              title="Search collection"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Wishlist Link */}
            <button
              onClick={() => handleLinkClick('/wishlist')}
              className="p-2 text-[#FAFAF8] hover:text-[#B7B0A5] transition-colors relative cursor-pointer"
              aria-label="Saved pieces wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#FAFAF8] text-[#101010] text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Customer Account */}
            <button
              onClick={() => handleLinkClick('/account')}
              className="p-2 text-[#FAFAF8] hover:text-[#B7B0A5] transition-colors cursor-pointer"
              aria-label="Customer account"
              title="Client Account"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Shopping Bag / Cart Drawer Trigger */}
            <button
              onClick={onOpenCartDrawer}
              className="flex items-center space-x-2 py-1.5 px-3 bg-[#1d1d1d] hover:bg-[#282828] border border-[#333333] transition-colors cursor-pointer"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#FAFAF8] stroke-[1.75]" />
              <span className="text-xs uppercase tracking-wider font-mono text-[#FAFAF8]">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Expandable Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#262626] bg-[#121212] px-6 py-8 space-y-6 animate-fadeIn">
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#777777]">Discovery</p>
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className="block w-full text-left font-serif text-2xl text-[#FAFAF8] hover:text-[#B7B0A5] transition-colors py-1"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#222222] space-y-3">
            <button
              onClick={() => handleLinkClick('/cart')}
              className="flex items-center justify-between w-full text-sm text-[#B7B0A5] hover:text-white"
            >
              <span>Shopping Bag</span>
              <span className="font-mono text-xs">{cartCount} items</span>
            </button>
            <button
              onClick={() => handleLinkClick('/wishlist')}
              className="flex items-center justify-between w-full text-sm text-[#B7B0A5] hover:text-white"
            >
              <span>Saved Wishlist</span>
              <span className="font-mono text-xs">{wishlistCount} items</span>
            </button>
            <button
              onClick={() => handleLinkClick('/admin')}
              className="flex items-center justify-between w-full text-sm text-emerald-400 hover:text-emerald-300"
            >
              <span>Atelier Management Console</span>
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
