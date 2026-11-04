export interface ProductVariant {
  id: string;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL';
  color: string;
  colorHex: string;
  inStock: boolean;
  sku: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  price: number; // in INR
  compareAtPrice?: number;
  category: 'outerwear' | 'tailoring' | 'knitwear' | 'dresses' | 'trousers' | 'accessories';
  collection: 'capsule-01' | 'monolith' | 'architectural' | 'hyper-minimal';
  description: string;
  details: string[];
  fabricComposition: string;
  careInstructions: string;
  images: string[];
  has3DModel: boolean;
  modelType?: 'trench' | 'jacket' | 'knit' | 'coat';
  variants: ProductVariant[];
  featured?: boolean;
  isNewArrival?: boolean;
  releaseYear: number;
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    addressLine1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'demo';
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
}

export type RoutePath =
  | '/'
  | '/shop'
  | '/collections'
  | `/collections/${string}`
  | `/product/${string}`
  | '/wishlist'
  | '/cart'
  | '/checkout'
  | '/account'
  | '/about'
  | '/contact'
  | '/shipping-returns'
  | '/privacy'
  | '/terms'
  | '/admin';
