export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  sku: string;
  category: string;
  finish: string;
  images: string[];
  description: string;
  features: string[];
  specifications: ProductSpec[];
  dimensions: ProductSpec[];
  material: string;
  stock: number;
  isNew?: boolean;
  isFeatured?: boolean;
  tags: string[];
}

export const CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "shower-sets", label: "Shower Sets" },
];

export const FINISHES = [
  { id: "all", label: "All Finishes" },
  { id: "matte-black", label: "Matte Black" },
  { id: "gold", label: "Brushed Gold" },
  { id: "chrome", label: "Polished Chrome" },
];

export const products: Product[] = [
  {
    id: "1",
    slug: "concealed-shower-set-matte-black",
    name: "Concealed Shower Set",
    subtitle: "Full Concealed Bathroom Set — Matte Black",
    price: 75000,
    sku: "BAT-CSS-MB-001",
    category: "shower-sets",
    finish: "matte-black",
    images: [
      "/products/product3.png",
    ],
    description:
      "The BATHAE Concealed Shower Set in Matte Black redefines contemporary bathroom design. This complete system integrates a precision-engineered concealed valve, a 12-inch overhead rainfall head, a flexible handheld shower, and a wall-mounted bath spout — all unified by a sleek matte black finish that resists fingerprints and complements any modern interior.",
    features: [
      "Full concealed installation for a clean wall finish",
      "12-inch square overhead rainfall shower head",
      "Handheld shower with flexible braided hose",
      "Wall-mounted bath spout included",
      "Single-lever concealed mixer valve",
      "Compatible with standard plumbing configurations",
      "Corrosion and tarnish resistant finish",
    ],
    specifications: [
      { label: "Finish", value: "Matte Black" },
      { label: "Material", value: "Brass & Stainless Steel" },
      { label: "Installation", value: "Wall-mounted, Concealed" },
      { label: "Valve Type", value: "Single Lever Concealed Mixer" },
      { label: "Water Pressure", value: "0.5 – 5 Bar (recommended)" },
      { label: "Set Includes", value: "Valve, Overhead Head, Handheld, Spout, Hose, Holder" },
      { label: "Warranty", value: "As per brand warranty policy" },
    ],
    dimensions: [
      { label: "Overhead Head", value: "12\" × 12\" (300mm × 300mm)" },
      { label: "Arm Length", value: "Approx. 400mm" },
      { label: "Valve Body", value: "160mm × 130mm" },
      { label: "Spout Length", value: "Approx. 200mm" },
      { label: "Hose Length", value: "1500mm" },
    ],
    material: "Premium brass body with stainless steel components and matte black PVD coating.",
    stock: 12,
    isFeatured: true,
    tags: ["shower", "concealed", "matte-black", "complete-set"],
  },
  {
    id: "2",
    slug: "concealed-shower-set-brushed-gold",
    name: "Concealed Shower Set",
    subtitle: "Full Concealed Bathroom Set — Brushed Gold",
    price: 75000,
    sku: "BAT-CSS-BG-002",
    category: "shower-sets",
    finish: "gold",
    images: [
      "/products/product1.png",
    ],
    description:
      "Elevate your bathroom to a statement of luxury with the BATHAE Concealed Shower Set in Brushed Gold. Every component in this complete system — from the concealed mixer valve to the rainfall overhead head — is unified under a warm, brushed gold finish that exudes timeless sophistication. Designed for those who view the bathroom as a space of genuine artistry.",
    features: [
      "Full concealed installation for a seamless wall finish",
      "12-inch square overhead rainfall shower head",
      "Handheld shower with gold-finished braided hose",
      "Wall-mounted bath spout included",
      "Single-lever concealed mixer valve",
      "Warm brushed gold PVD finish — tarnish and corrosion resistant",
      "Compatible with standard plumbing configurations",
    ],
    specifications: [
      { label: "Finish", value: "Brushed Gold (PVD)" },
      { label: "Material", value: "Brass & Stainless Steel" },
      { label: "Installation", value: "Wall-mounted, Concealed" },
      { label: "Valve Type", value: "Single Lever Concealed Mixer" },
      { label: "Water Pressure", value: "0.5 – 5 Bar (recommended)" },
      { label: "Set Includes", value: "Valve, Overhead Head, Handheld, Spout, Hose, Holder" },
      { label: "Warranty", value: "As per brand warranty policy" },
    ],
    dimensions: [
      { label: "Overhead Head", value: "12\" × 12\" (300mm × 300mm)" },
      { label: "Arm Length", value: "Approx. 400mm" },
      { label: "Valve Body", value: "160mm × 130mm" },
      { label: "Spout Length", value: "Approx. 200mm" },
      { label: "Hose Length", value: "1500mm" },
    ],
    material: "Premium brass body with stainless steel components and brushed gold PVD coating.",
    stock: 8,
    isNew: true,
    isFeatured: true,
    tags: ["shower", "concealed", "gold", "complete-set", "luxury"],
  },
  {
    id: "3",
    slug: "concealed-shower-set-chrome",
    name: "Concealed Shower Set",
    subtitle: "Full Concealed Bathroom Set — Polished Chrome",
    price: 75000,
    sku: "BAT-CSS-CR-003",
    category: "shower-sets",
    finish: "chrome",
    images: [
      "/products/product2.png",
    ],
    description:
      "The classic reinvented. The BATHAE Concealed Shower Set in Polished Chrome delivers the clean, reflective brilliance of high-quality chrome in a fully concealed configuration. This is the standard by which bathroom sets should be measured — precise engineering, complete components, and an enduring finish that works with any interior palette.",
    features: [
      "Full concealed installation for a clean wall finish",
      "12-inch square overhead rainfall shower head",
      "Handheld shower with polished chrome hose",
      "Wall-mounted bath spout included",
      "Single-lever concealed mixer valve",
      "High-gloss polished chrome finish",
      "Compatible with standard plumbing configurations",
    ],
    specifications: [
      { label: "Finish", value: "Polished Chrome" },
      { label: "Material", value: "Brass & Stainless Steel" },
      { label: "Installation", value: "Wall-mounted, Concealed" },
      { label: "Valve Type", value: "Single Lever Concealed Mixer" },
      { label: "Water Pressure", value: "0.5 – 5 Bar (recommended)" },
      { label: "Set Includes", value: "Valve, Overhead Head, Handheld, Spout, Hose, Holder" },
      { label: "Warranty", value: "As per brand warranty policy" },
    ],
    dimensions: [
      { label: "Overhead Head", value: "12\" × 12\" (300mm × 300mm)" },
      { label: "Arm Length", value: "Approx. 400mm" },
      { label: "Valve Body", value: "160mm × 130mm" },
      { label: "Spout Length", value: "Approx. 200mm" },
      { label: "Hose Length", value: "1500mm" },
    ],
    material: "Premium brass body with stainless steel components and polished chrome finish.",
    stock: 3,
    isFeatured: true,
    tags: ["shower", "concealed", "chrome", "complete-set", "classic"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export function getStockLabel(stock: number): { label: string; color: string } {
  if (stock === 0) return { label: "Out of Stock", color: "text-red-500" };
  if (stock <= 3) return { label: `Only ${stock} left`, color: "text-amber-500" };
  return { label: "In Stock", color: "text-emerald-600" };
}

export function formatPrice(price: number): string {
  return `PKR ${price.toLocaleString("en-PK")}`;
}
