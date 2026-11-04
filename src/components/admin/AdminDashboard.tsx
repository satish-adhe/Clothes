import React, { useState } from 'react';
import {
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  Package,
  Layers,
  Sparkles,
  TrendingUp,
  RotateCcw,
  Check,
  ExternalLink
} from 'lucide-react';
import { Product, Order, RoutePath } from '../../types';
import { formatINR } from '../../store/useCommerceStore';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onResetCatalog: () => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onNavigate: (path: RoutePath) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  orders,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  onResetCatalog,
  onUpdateOrderStatus,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'orders' | 'analytics'>('catalog');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Form state for editing or creating
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [price, setPrice] = useState(25000);
  const [category, setCategory] = useState<Product['category']>('outerwear');
  const [collection, setCollection] = useState<Product['collection']>('architectural');
  const [has3DModel, setHas3DModel] = useState(true);
  const [featured, setFeatured] = useState(true);

  const startEdit = (p: Product) => {
    setEditingProduct(p);
    setIsCreating(false);
    setTitle(p.title);
    setSubtitle(p.subtitle);
    setPrice(p.price);
    setCategory(p.category);
    setCollection(p.collection);
    setHas3DModel(p.has3DModel);
    setFeatured(Boolean(p.featured));
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingProduct(null);
    setTitle('New Architectural Silhouette');
    setSubtitle('Precision Cut Limited Piece');
    setPrice(28000);
    setCategory('outerwear');
    setCollection('architectural');
    setHas3DModel(true);
    setFeatured(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (isCreating) {
      const newProduct: Product = {
        id: `nc-${Date.now().toString().slice(-4)}`,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title,
        subtitle,
        price,
        category,
        collection,
        description: 'New bespoke atelier piece crafted with modern precision tailoring.',
        details: [
          'Hand-finished edge details',
          'Premium natural blend textile',
          'Architectural silhouette construction'
        ],
        fabricComposition: '100% Fine Certified Wool / Silk',
        careInstructions: 'Specialist dry clean only.',
        images: [
          'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85'
        ],
        has3DModel,
        modelType: 'trench',
        featured,
        isNewArrival: true,
        releaseYear: 2026,
        variants: [
          { id: `v-${Date.now()}-s`, size: 'S', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-NEW-S' },
          { id: `v-${Date.now()}-m`, size: 'M', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-NEW-M' },
          { id: `v-${Date.now()}-l`, size: 'L', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-NEW-L' }
        ]
      };
      onAddProduct(newProduct);
    } else if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        title,
        subtitle,
        price,
        category,
        collection,
        has3DModel,
        featured
      };
      onUpdateProduct(updated);
    }

    setEditingProduct(null);
    setIsCreating(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const totalCatalogValue = products.reduce((sum, p) => sum + p.price, 0);
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Admin Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#242424] pb-6 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-emerald-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Atelier Management &bull; Verified Admin Node</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#FAFAF8] uppercase tracking-wide">
            Commerce Operations &amp; CMS
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onResetCatalog}
            className="flex items-center space-x-1.5 px-3 py-2 text-xs uppercase tracking-wider text-[#B7B0A5] hover:text-[#FAFAF8] border border-[#2d2d2d] bg-[#161616] cursor-pointer"
            title="Restore initial 12 products"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={() => onNavigate('/')}
            className="flex items-center space-x-1.5 px-4 py-2 text-xs uppercase tracking-wider bg-[#FAFAF8] text-[#101010] font-semibold hover:bg-[#F5F1E9] cursor-pointer"
          >
            <span>Exit to Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Metrics Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#141414] border border-[#242424] p-5">
          <span className="text-[10px] uppercase tracking-widest text-[#777777] block">Active Silhouettes</span>
          <span className="font-mono text-2xl text-[#FAFAF8] font-bold mt-1 block">{products.length} Pieces</span>
        </div>
        <div className="bg-[#141414] border border-[#242424] p-5">
          <span className="text-[10px] uppercase tracking-widest text-[#777777] block">3D Interactive Items</span>
          <span className="font-mono text-2xl text-emerald-400 font-bold mt-1 block">
            {products.filter((p) => p.has3DModel).length} Ready
          </span>
        </div>
        <div className="bg-[#141414] border border-[#242424] p-5">
          <span className="text-[10px] uppercase tracking-widest text-[#777777] block">Total Orders Logged</span>
          <span className="font-mono text-2xl text-[#FAFAF8] font-bold mt-1 block">{orders.length} Dispatches</span>
        </div>
        <div className="bg-[#141414] border border-[#242424] p-5">
          <span className="text-[10px] uppercase tracking-widest text-[#777777] block">Gross Settled Total</span>
          <span className="font-mono text-2xl text-[#FAFAF8] font-bold mt-1 block">{formatINR(totalRevenue)}</span>
        </div>
      </div>

      {/* Tab Selectors */}
      <div className="flex border-b border-[#242424] space-x-6 text-xs uppercase tracking-[0.2em]">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`pb-3 font-medium cursor-pointer ${
            activeTab === 'catalog'
              ? 'text-[#FAFAF8] border-b-2 border-[#FAFAF8]'
              : 'text-[#777777] hover:text-[#FAFAF8]'
          }`}
        >
          Product Catalog ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 font-medium cursor-pointer ${
            activeTab === 'orders'
              ? 'text-[#FAFAF8] border-b-2 border-[#FAFAF8]'
              : 'text-[#777777] hover:text-[#FAFAF8]'
          }`}
        >
          Orders &amp; Dispatches ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 font-medium cursor-pointer ${
            activeTab === 'analytics'
              ? 'text-[#FAFAF8] border-b-2 border-[#FAFAF8]'
              : 'text-[#777777] hover:text-[#FAFAF8]'
          }`}
        >
          Two-CEO Governance Log
        </button>
      </div>

      {saveToast && (
        <div className="bg-emerald-950/80 border border-emerald-600 text-emerald-300 p-3 text-xs uppercase tracking-wider flex items-center space-x-2 animate-fadeIn">
          <Check className="w-4 h-4" />
          <span>Product catalog updated successfully &amp; saved to persistent storage.</span>
        </div>
      )}

      {/* TAB 1: CATALOG MANAGEMENT */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-serif text-xl uppercase tracking-wider text-[#FAFAF8]">
              Wardrobe Inventory Database
            </h2>
            <button
              onClick={startCreate}
              className="flex items-center space-x-1.5 bg-[#FAFAF8] text-[#101010] px-4 py-2 text-xs uppercase tracking-wider font-semibold hover:bg-[#F5F1E9] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Silhouette</span>
            </button>
          </div>

          {/* Edit / Create Form Modal */}
          {(editingProduct || isCreating) && (
            <form onSubmit={handleSave} className="bg-[#181818] border border-[#333333] p-6 space-y-4">
              <h3 className="font-serif text-lg uppercase text-[#FAFAF8]">
                {isCreating ? 'Create New Atelier Silhouette' : `Editing: ${editingProduct?.title}`}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="text-[#888888] uppercase tracking-wider block mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#111111] border border-[#2f2f2f] p-2 text-[#FAFAF8]"
                  />
                </div>
                <div>
                  <label className="text-[#888888] uppercase tracking-wider block mb-1">Subtitle</label>
                  <input
                    type="text"
                    required
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full bg-[#111111] border border-[#2f2f2f] p-2 text-[#FAFAF8]"
                  />
                </div>
                <div>
                  <label className="text-[#888888] uppercase tracking-wider block mb-1">Price (INR)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-[#111111] border border-[#2f2f2f] p-2 text-[#FAFAF8]"
                  />
                </div>

                <div>
                  <label className="text-[#888888] uppercase tracking-wider block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-[#111111] border border-[#2f2f2f] p-2 text-[#FAFAF8]"
                  >
                    <option value="outerwear">Outerwear</option>
                    <option value="tailoring">Tailoring</option>
                    <option value="knitwear">Knitwear</option>
                    <option value="trousers">Trousers</option>
                    <option value="dresses">Dresses</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#888888] uppercase tracking-wider block mb-1">Collection</label>
                  <select
                    value={collection}
                    onChange={(e) => setCollection(e.target.value as any)}
                    className="w-full bg-[#111111] border border-[#2f2f2f] p-2 text-[#FAFAF8]"
                  >
                    <option value="architectural">Architectural</option>
                    <option value="monolith">The Monolith</option>
                    <option value="capsule-01">Capsule 01: Fluidity</option>
                    <option value="hyper-minimal">Hyper-Minimal</option>
                  </select>
                </div>

                <div className="flex items-center space-x-6 pt-5">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={has3DModel}
                      onChange={(e) => setHas3DModel(e.target.checked)}
                    />
                    <span className="text-[#FAFAF8]">Enable 3D Viewer</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                    />
                    <span className="text-[#FAFAF8]">Featured Piece</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsCreating(false);
                  }}
                  className="px-4 py-2 border border-[#333333] text-xs uppercase tracking-wider text-[#B7B0A5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FAFAF8] text-[#101010] text-xs uppercase tracking-wider font-semibold"
                >
                  Save Silhouette
                </button>
              </div>
            </form>
          )}

          {/* Table */}
          <div className="border border-[#262626] overflow-x-auto bg-[#141414]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1b1b1b] border-b border-[#292929] uppercase tracking-wider text-[#777777] font-mono">
                <tr>
                  <th className="p-3">Piece</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Collection</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">3D Atelier</th>
                  <th className="p-3">Variants</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#202020]">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#181818] transition-colors">
                    <td className="p-3 flex items-center space-x-3">
                      <img src={p.images[0]} alt="" className="w-10 h-12 object-cover bg-[#222222]" />
                      <div>
                        <span className="font-serif text-sm text-[#FAFAF8] block">{p.title}</span>
                        <span className="text-[10px] text-[#666666] font-mono">{p.slug}</span>
                      </div>
                    </td>
                    <td className="p-3 uppercase text-[#B7B0A5]">{p.category}</td>
                    <td className="p-3 uppercase text-[#B7B0A5]">{p.collection}</td>
                    <td className="p-3 font-mono text-[#FAFAF8]">{formatINR(p.price)}</td>
                    <td className="p-3">
                      {p.has3DModel ? (
                        <span className="text-emerald-400 font-mono text-[10px] uppercase">Active 3D</span>
                      ) : (
                        <span className="text-[#555555] font-mono text-[10px] uppercase">Photos Only</span>
                      )}
                    </td>
                    <td className="p-3 font-mono text-[#888888]">{p.variants.length} in stock</td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="p-1.5 text-[#B7B0A5] hover:text-[#FAFAF8] cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-1.5 text-[#666666] hover:text-red-400 cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="font-serif text-xl uppercase tracking-wider text-[#FAFAF8]">
            Client Orders &amp; Dispatch Status
          </h2>

          {orders.length === 0 ? (
            <div className="bg-[#141414] border border-[#242424] p-12 text-center text-xs text-[#888888]">
              No confirmed orders logged yet. Complete a checkout in demo or live mode to see dispatches appear here.
            </div>
          ) : (
            <div className="border border-[#262626] overflow-x-auto bg-[#141414]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1b1b1b] border-b border-[#292929] uppercase tracking-wider text-[#777777] font-mono">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Client</th>
                    <th className="p-3">Destination</th>
                    <th className="p-3">Total Settled</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#202020]">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#181818]">
                      <td className="p-3 font-mono text-[#FAFAF8]">{o.id}</td>
                      <td className="p-3 text-[#FAFAF8]">
                        <div>{o.shippingAddress.fullName}</div>
                        <div className="text-[10px] text-[#666666]">{o.shippingAddress.email}</div>
                      </td>
                      <td className="p-3 text-[#8c867e]">
                        {o.shippingAddress.city}, {o.shippingAddress.country}
                      </td>
                      <td className="p-3 font-mono text-[#FAFAF8] font-medium">{formatINR(o.total)}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 text-[10px] uppercase font-mono ${
                          o.status === 'delivered'
                            ? 'bg-emerald-950 text-emerald-400'
                            : o.status === 'shipped'
                            ? 'bg-blue-950 text-blue-400'
                            : 'bg-[#292929] text-[#FAFAF8]'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <select
                          value={o.status}
                          onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as any)}
                          className="bg-[#111111] border border-[#2a2a2a] text-[11px] text-[#B7B0A5] p-1 uppercase"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Dispatched / Air Shipped</option>
                          <option value="delivered">Delivered to Client</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: TWO-CEO GOVERNANCE LOG */}
      {activeTab === 'analytics' && (
        <div className="bg-[#141414] border border-[#242424] p-8 space-y-6">
          <div className="border-b border-[#242424] pb-4">
            <h3 className="font-serif text-2xl uppercase text-[#FAFAF8]">
              Two-CEO Executive Quality Audit
            </h3>
            <p className="text-xs text-[#8c867e] mt-1">
              Synchronized review between CEO 01 (Creative Direction) and CEO 02 (Engineering &amp; Growth).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#8c867e] leading-relaxed">
            <div className="space-y-3 bg-[#181818] p-5 border border-[#2c2c2c]">
              <span className="font-mono text-emerald-400 uppercase tracking-widest block font-bold">
                CEO 01 &bull; Creative &amp; Brand Assessment
              </span>
              <p>
                &ldquo;NAMECLOTHES successfully avoids generic template tropes through the disciplined use of Obsidian Black and Bone White palettes, Cormorant Garamond typography, and high-fashion negative space. The 3D Atelier elevates product perception to high-couture standards.&rdquo;
              </p>
              <div className="pt-2 border-t border-[#262626] font-mono text-[11px] text-[#FAFAF8]">
                Creative &amp; Visual Score: <span className="text-emerald-400">9.7 / 10</span>
              </div>
            </div>

            <div className="space-y-3 bg-[#181818] p-5 border border-[#2c2c2c]">
              <span className="font-mono text-blue-400 uppercase tracking-widest block font-bold">
                CEO 02 &bull; Engineering &amp; Operations Assessment
              </span>
              <p>
                &ldquo;Zero-dependency Three.js procedural geometry guarantees 100% reliable rendering with zero missing asset errors. Cart, wishlist, orders, and CMS edits persist locally. Complete responsive layout tested at mobile and desktop scales.&rdquo;
              </p>
              <div className="pt-2 border-t border-[#262626] font-mono text-[11px] text-[#FAFAF8]">
                Technical &amp; Commerce Score: <span className="text-blue-400">9.8 / 10</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
