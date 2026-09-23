"use client";

import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/products";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, getSubtotal } =
    useCartStore();
  const subtotal = useCartStore((s) => s.getSubtotal());

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[70] bg-stone-950/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed right-0 top-0 bottom-0 z-[80] w-full max-w-md bg-white flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-stone-100">
              <h2 className="text-lg font-semibold tracking-wide text-stone-900">Your Cart</h2>
              <button
                onClick={closeCart}
                className="text-stone-400 hover:text-stone-700 transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-stone-200 mb-4" />
                  <p className="text-stone-400 text-lg font-light">Your cart is empty</p>
                  <button
                    onClick={closeCart}
                    className="mt-6 text-sm text-stone-500 hover:text-stone-800 underline underline-offset-4 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="relative w-20 h-20 bg-stone-50 border border-stone-100 flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-stone-900 leading-tight">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-stone-400 mt-0.5">{item.product.subtitle}</p>
                        <p className="text-sm font-semibold text-stone-900 mt-1">
                          {formatPrice(item.product.price)}
                        </p>

                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-stone-200">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-sm text-stone-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              disabled={item.quantity >= item.product.stock}
                              className="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors disabled:opacity-30"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-stone-300 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-8 py-6 border-t border-stone-100 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-stone-500">Subtotal</span>
                  <span className="text-base font-semibold text-stone-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="text-xs text-stone-400">
                  Shipping and taxes calculated at checkout.
                </p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full bg-stone-900 text-white text-center py-4 text-sm font-medium tracking-widest uppercase hover:bg-stone-800 transition-colors"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full text-center text-xs text-stone-400 hover:text-stone-600 transition-colors py-1"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
