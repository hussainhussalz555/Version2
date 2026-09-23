"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatPrice, getStockLabel } from "@/lib/products";
import { useCartStore } from "@/store/cart";
import QuickViewModal from "./QuickViewModal";
import SafeImage from "@/components/SafeImage";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const stockInfo = getStockLabel(product.stock);

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addItem(product, 1);
      openCart();
    }
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group relative"
      >
        <div className="relative mb-4 aspect-square overflow-hidden border border-stone-200 bg-stone-100">
          <Link
            href={`/products/${product.slug}`}
            aria-label={`View ${product.name}, ${product.subtitle}`}
            className="absolute inset-0 z-0 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-600"
          >
            <SafeImage
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
            />
          </Link>

          {product.isNew && (
            <span className="pointer-events-none absolute left-4 top-4 z-[1] bg-amber-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              New
            </span>
          )}
          {product.stock === 0 && (
            <span className="pointer-events-none absolute left-4 top-4 z-[1] bg-stone-700 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              Sold Out
            </span>
          )}

          <div className="absolute bottom-4 left-4 right-4 z-10 flex gap-2 transition-opacity md:pointer-events-none md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:opacity-100">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex min-h-11 flex-1 items-center justify-center gap-2 bg-stone-950 px-3 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingBag size={14} aria-hidden="true" />
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => setQuickViewOpen(true)}
              aria-label={`Quick view ${product.name}, ${product.subtitle}`}
              className="flex min-h-11 min-w-11 items-center justify-center border border-stone-300 bg-white text-stone-800 transition-colors hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
            >
              <Eye size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <Link href={`/products/${product.slug}`} className="block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2">
          <p className="mb-1 text-[11px] uppercase tracking-[0.14em] text-stone-500">
            {product.finish.replaceAll("-", " ")}
          </p>
          <h3 className="font-display text-lg leading-tight text-stone-900 transition-colors group-hover:text-amber-800">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-1 text-sm text-stone-600">{product.subtitle}</p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-stone-950">{formatPrice(product.price)}</p>
            <span className={`text-xs font-medium ${stockInfo.color}`}>{stockInfo.label}</span>
          </div>
        </Link>
      </motion.article>

      <QuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}
