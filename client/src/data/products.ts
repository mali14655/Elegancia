export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  desc: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'bundle',
    name: 'Elegancia Bottle Bundle',
    price: 7500,
    image: '/assets/products/bundle.png',
    desc: 'Premium collection — 500ml, 1500ml & 5000ml bottles for home and events.',
  },
  {
    id: '1500ml',
    name: 'Elegancia Bottle 1500ml',
    price: 1200,
    image: '/assets/products/bottle-1500.png',
    desc: 'The statement bottle for homes, events, and elite tables.',
  },
  {
    id: '5000ml',
    name: 'Elegancia Bottle 5000ml',
    price: 2500,
    image: '/assets/products/bottle-5000.png',
    desc: 'Large-format elegance for families, offices, and hospitality.',
  },
  {
    id: '500ml',
    name: 'Elegancia Bottle 500ml',
    price: 350,
    image: '/assets/products/bottle-500.png',
    desc: 'Compact elegance for on-the-go refinement.',
  },
];

export function formatPrice(amount: number): string {
  if (amount <= 0) return 'On request';
  return `Rs${amount.toLocaleString('en-PK')}.00`;
}

export function isCustomPriced(price: number): boolean {
  return price <= 0;
}

export const CUSTOM_ORDER_PRODUCT: Product = {
  id: 'custom-order',
  name: 'Custom Order Request',
  price: 0,
  image: '/assets/waterbottle.png',
  desc: 'Tailored quantities, events, corporate & bulk — our team will confirm pricing.',
};

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

/** 6 × 500ml small bottles */
export const SMALL_BUNDLE_PRESET = {
  id: 'small-bundle',
  name: 'Small Bundle',
  description: '6 × 500ml bottles',
  image: '/assets/products/bottle-500.png',
  items: [{ productId: '500ml', qty: 6 }] as const,
};

/** 6 × 1500ml large bottles */
export const LARGE_BUNDLE_PRESET = {
  id: 'large-bundle',
  name: 'Large Bundle',
  description: '6 × 1500ml bottles',
  image: '/assets/products/bottle-1500.png',
  items: [{ productId: '1500ml', qty: 6 }] as const,
};

export function getPresetTotal(items: readonly { productId: string; qty: number }[]): number {
  return items.reduce((sum, entry) => {
    const product = getProduct(entry.productId);
    return sum + (product?.price ?? 0) * entry.qty;
  }, 0);
}

export type CustomOrderOption =
  | {
      id: string;
      type: 'preset';
      title: string;
      description: string;
      image: string;
      items: readonly { productId: string; qty: number }[];
      addLabel: string;
    }
  | {
      id: string;
      type: 'single';
      productId: '500ml' | '1500ml' | '5000ml';
      title: string;
      description: string;
      addLabel: string;
    };

/** 5 custom-order choices: 2 bundles + 3 singles */
export const CUSTOM_ORDER_OPTIONS: CustomOrderOption[] = [
  {
    id: SMALL_BUNDLE_PRESET.id,
    type: 'preset',
    title: SMALL_BUNDLE_PRESET.name,
    description: SMALL_BUNDLE_PRESET.description,
    image: SMALL_BUNDLE_PRESET.image,
    items: SMALL_BUNDLE_PRESET.items,
    addLabel: 'Add 6-Pack',
  },
  {
    id: LARGE_BUNDLE_PRESET.id,
    type: 'preset',
    title: LARGE_BUNDLE_PRESET.name,
    description: LARGE_BUNDLE_PRESET.description,
    image: LARGE_BUNDLE_PRESET.image,
    items: LARGE_BUNDLE_PRESET.items,
    addLabel: 'Add 6-Pack',
  },
  {
    id: '5000ml',
    type: 'single',
    productId: '5000ml',
    title: '5000ml Jug',
    description: '1 jug at a time',
    addLabel: 'Add 1 jug',
  },
  {
    id: '1500ml',
    type: 'single',
    productId: '1500ml',
    title: '1500ml Bottle',
    description: '1 bottle at a time',
    addLabel: 'Add 1 bottle',
  },
  {
    id: '500ml',
    type: 'single',
    productId: '500ml',
    title: '500ml Bottle',
    description: '1 bottle at a time',
    addLabel: 'Add 1 bottle',
  },
];
