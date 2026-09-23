"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatPrice, getStockLabel } from "@/lib/products";
import { useCartStore } from "@/store/cart";
import QuickViewModal from "./QuickViewModal";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const stockInfo = getStockLabel(product.stock);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock > 0) {
      addItem(product, 1);
      openCart();
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="group relative"
      >
        <Link href={`/products/${product.slug}`} className="block">
          {/* Image Container */}
          <div className="relative aspect-square bg-stone-50 border border-stone-100 overflow-hidden mb-4">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
            />

            {/* Second image on hover */}
            {product.images[1] && (
              <Image
                src={product.images[1]}
                alt={product.name}
                fill
                className={`object-contain p-8 absolute inset-0 transition-opacity duration-500 ${
                  hovered ? "opacity-100" : "opacity-0"
                }`}
              />
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <span className="bg-amber-500 text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1">
                  New
                </span>
              )}
              {product.stock === 0 && (
                <span className="bg-stone-700 text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1">
                  Sold Out
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-4 left-4 right-4 flex gap-2"
            >
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-stone-900 text-white text-xs font-medium tracking-wider uppercase py-3 flex items-center justify-center gap-2 hover:bg-stone-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={13} />
                Add to Cart
              </button>
              <button
                onClick={handleQuickView}
                className="bg-white border border-stone-200 text-stone-700 px-3 flex items-center justify-center hover:bg-stone-50 transition-colors"
              >
                <Eye size={15} />
              </button>
            </motion.div>
          </div>

          {/* Info */}
          <div>
            <p className="text-[11px] text-stone-400 tracking-widest uppercase mb-1">
              {product.finish.replace("-", " ")}
            </p>
            <h3 className="text-stone-900 font-medium text-sm leading-tight group-hover:text-stone-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-stone-500 text-xs mt-0.5 line-clamp-1">{product.subtitle}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-stone-900 font-semibold text-sm">{formatPrice(product.price)}</p>
              <span className={`text-[11px] font-medium ${stockInfo.color}`}>{stockInfo.label}</span>
            </div>
          </div>
        </Link>
      </motion.div>

      <QuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}
