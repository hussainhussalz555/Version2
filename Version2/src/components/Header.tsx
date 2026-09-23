"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/collections", label: "Collections" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/quality", label: "Quality" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const { toggleCart, getItemCount } = useCartStore();
  const itemCount = useCartStore((s) => s.getItemCount());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <div className="relative h-10 w-36">
                <Image
                  src="/logo/bathae-logo.png"
                  alt="BATHAE"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] font-medium tracking-widest uppercase transition-colors duration-200 ${
                    scrolled
                      ? "text-stone-700 hover:text-stone-900"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className={`p-2 transition-colors ${
                  scrolled ? "text-stone-700 hover:text-stone-900" : "text-white/90 hover:text-white"
                }`}
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <button
                onClick={toggleCart}
                className={`relative p-2 transition-colors ${
                  scrolled ? "text-stone-700 hover:text-stone-900" : "text-white/90 hover:text-white"
                }`}
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMenuOpen(true)}
                className={`lg:hidden p-2 transition-colors ${
                  scrolled ? "text-stone-700 hover:text-stone-900" : "text-white/90 hover:text-white"
                }`}
                aria-label="Menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-stone-950/90 backdrop-blur-sm flex items-start pt-32 justify-center px-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSearchOpen(false);
            }}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="w-full max-w-2xl"
            >
              <form onSubmit={handleSearch} className="relative">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-transparent border-b-2 border-amber-500 text-white text-3xl font-light py-4 pr-12 outline-none placeholder-white/30"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  <Search size={24} />
                </button>
              </form>
              <button
                onClick={() => setSearchOpen(false)}
                className="mt-6 text-white/40 hover:text-white/80 text-sm tracking-widest uppercase transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-stone-950"
          >
            <div className="flex flex-col h-full px-8 py-8">
              <div className="flex justify-between items-center mb-16">
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  <div className="relative h-9 w-32">
                    <Image
                      src="/logo/bathae-logo.png"
                      alt="BATHAE"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-8 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-white text-4xl font-light tracking-tight hover:text-amber-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="pt-8 border-t border-white/10">
                <p className="text-white/30 text-sm tracking-widest uppercase">BATHAE</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
