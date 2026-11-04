import React, { useState, useEffect } from 'react';
import { RoutePath, Product } from './types';
import { useCommerceStore } from './store/useCommerceStore';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/HomePage';
import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/products/ProductDetailPage';
import { CheckoutPage } from './components/CheckoutPage';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchModal } from './components/ui/SearchModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StaticPages } from './components/StaticPages';
import { COLLECTIONS_DATA } from './data/products';

export function App() {
  // Current route management
  const [currentPath, setCurrentPath] = useState<RoutePath>(() => {
    return (window.location.hash.slice(1) as RoutePath) || '/';
  });

  // Selected product for PDP
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Modals / Drawers state
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Commerce store
  const {
    products,
    cart,
    wishlist,
    orders,
    cartSubtotal,
    shippingFee,
    taxFee,
    cartTotal,
    cartCount,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
    isInWishlist,
    updateProduct,
    addProduct,
    deleteProduct,
    resetDefaultCatalog,
    createOrder,
    updateOrderStatus
  } = useCommerceStore();

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as RoutePath;
      if (hash) {
        setCurrentPath(hash);
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (path: RoutePath) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    navigateTo(`/product/${product.slug}` as RoutePath);
  };

  // Resolve active product if direct slug navigated
  useEffect(() => {
    if (currentPath.startsWith('/product/')) {
      const slug = currentPath.replace('/product/', '');
      const found = products.find((p) => p.slug === slug);
      if (found) setSelectedProduct(found);
    }
  }, [currentPath, products]);

  // Determine active view
  const renderCurrentView = () => {
    // 1. Product Detail Page
    if (currentPath.startsWith('/product/')) {
      const slug = currentPath.replace('/product/', '');
      const product = selectedProduct || products.find((p) => p.slug === slug) || products[0];

      return (
        <ProductDetailPage
          product={product}
          allProducts={products}
          onSelectProduct={handleSelectProduct}
          onNavigate={navigateTo}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          isWishlisted={isInWishlist(product.id)}
        />
      );
    }

    // 2. Collection specific pages
    if (currentPath.startsWith('/collections/')) {
      const colSlug = currentPath.replace('/collections/', '');
      return (
        <ShopPage
          products={products}
          onSelectProduct={handleSelectProduct}
          onNavigate={navigateTo}
          onToggleWishlist={toggleWishlist}
          wishlist={wishlist}
          initialCollection={colSlug}
        />
      );
    }

    // 3. Collection Index
    if (currentPath === '/collections') {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
          <div className="border-b border-[#242424] pb-6 space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#B7B0A5] block">
              Curated Monograph Index
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-[#FAFAF8] uppercase tracking-wide">
              The Collections
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COLLECTIONS_DATA.map((col) => (
              <div
                key={col.slug}
                onClick={() => navigateTo(`/collections/${col.slug}` as RoutePath)}
                className="group relative aspect-[16/10] bg-[#161616] border border-[#262626] overflow-hidden cursor-pointer"
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#B7B0A5] font-mono">
                    {col.itemCount} Silhouettes Available
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#FAFAF8] uppercase group-hover:text-[#B7B0A5] transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs text-[#8c867e] line-clamp-1">{col.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 4. Shop All
    if (currentPath === '/shop') {
      return (
        <ShopPage
          products={products}
          onSelectProduct={handleSelectProduct}
          onNavigate={navigateTo}
          onToggleWishlist={toggleWishlist}
          wishlist={wishlist}
        />
      );
    }

    // 5. Checkout
    if (currentPath === '/checkout') {
      return (
        <CheckoutPage
          items={cart}
          subtotal={cartSubtotal}
          shipping={shippingFee}
          tax={taxFee}
          total={cartTotal}
          onNavigate={navigateTo}
          onCreateOrder={createOrder}
        />
      );
    }

    // 6. Admin Panel
    if (currentPath === '/admin') {
      return (
        <AdminDashboard
          products={products}
          orders={orders}
          onUpdateProduct={updateProduct}
          onAddProduct={addProduct}
          onDeleteProduct={deleteProduct}
          onResetCatalog={resetDefaultCatalog}
          onUpdateOrderStatus={updateOrderStatus}
          onNavigate={navigateTo}
        />
      );
    }

    // 7. Wishlist
    if (currentPath === '/wishlist') {
      const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));
      return (
        <StaticPages
          pageType="wishlist"
          onNavigate={navigateTo}
          wishlistProducts={wishlistedProducts}
          onSelectProduct={handleSelectProduct}
          onToggleWishlist={toggleWishlist}
        />
      );
    }

    // 8. Full Bag / Cart Page
    if (currentPath === '/cart') {
      return (
        <StaticPages
          pageType="cart"
          onNavigate={navigateTo}
          cartItems={cart}
          cartSubtotal={cartSubtotal}
          shippingFee={shippingFee}
          taxFee={taxFee}
          cartTotal={cartTotal}
          onUpdateCartQuantity={updateCartQuantity}
          onRemoveCartItem={removeFromCart}
        />
      );
    }

    // 9. Account
    if (currentPath === '/account') {
      return <StaticPages pageType="account" onNavigate={navigateTo} orders={orders} />;
    }

    // 10. About
    if (currentPath === '/about') {
      return <StaticPages pageType="about" onNavigate={navigateTo} />;
    }

    // 11. Contact
    if (currentPath === '/contact') {
      return <StaticPages pageType="contact" onNavigate={navigateTo} />;
    }

    // 12. Shipping & Returns
    if (currentPath === '/shipping-returns') {
      return <StaticPages pageType="shipping" onNavigate={navigateTo} />;
    }

    // 13. Privacy
    if (currentPath === '/privacy') {
      return <StaticPages pageType="privacy" onNavigate={navigateTo} />;
    }

    // 14. Terms
    if (currentPath === '/terms') {
      return <StaticPages pageType="terms" onNavigate={navigateTo} />;
    }

    // Default: 0. Homepage
    return (
      <HomePage
        products={products}
        onSelectProduct={handleSelectProduct}
        onNavigate={navigateTo}
        onToggleWishlist={toggleWishlist}
        wishlist={wishlist}
        onQuickAdd={(p) => addToCart(p, p.variants[0], 1)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#101010] text-[#FAFAF8] flex flex-col selection:bg-[#F5F1E9] selection:text-[#101010]">
      {/* Top Navbar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onOpenCartDrawer={() => setIsCartDrawerOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Flagship Content Area */}
      <main className="flex-1">{renderCurrentView()}</main>

      {/* Persistent Drawer Cart */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        items={cart}
        subtotal={cartSubtotal}
        shipping={shippingFee}
        tax={taxFee}
        total={cartTotal}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onNavigate={navigateTo}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={handleSelectProduct}
        onNavigate={navigateTo}
      />

      {/* Global Luxury Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default App;
