"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Search, Menu, X, ChevronDown } from "lucide-react";
import Logo from "@/components/Logo";

const navLinks = [
  { href: "/collections", label: "Collections" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/quality", label: "Quality" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const toggleCart = useCartStore((state) => state.toggleCart);
  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen && !menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [searchOpen, menuOpen]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    setSearchOpen(false);
    setSearchQuery("");
    router.push(`/shop?search=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <header
        className={`site-header fixed inset-x-0 top-0 z-50 text-white ${
          scrolled
            ? "border-b border-white/10 bg-[#10110f]/85 shadow-[0_10px_40px_rgba(0,0,0,0.32)] backdrop-blur-xl"
            : "border-b border-transparent bg-[#10110f]/55 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto max-w-screen-xl px-6 lg:px-12">
          <div
            className={`flex items-center justify-between transition-[height] duration-500 ${
              scrolled ? "h-16" : "h-20"
            }`}
          >
            <Link href="/" aria-label="BATHAE home" className="flex flex-shrink-0 items-center">
              <Logo size="sm" />
            </Link>

            <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex xl:gap-10">
              {navLinks.map((link) =>
                link.href === "/collections" ? (
                  <div key={link.href} className="group relative flex h-20 items-center">
                    <Link
                      href={link.href}
                      className="nav-link flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-[#e3bc78] focus-visible:text-[#e3bc78]"
                    >
                      Collections <ChevronDown size={13} className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                    </Link>
                    <div className="invisible absolute left-1/2 top-[calc(100%-2px)] w-60 -translate-x-1/2 translate-y-2 rounded-2xl border border-white/10 bg-[#1d1e1b]/95 p-3 opacity-0 shadow-2xl backdrop-blur-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      {[
                        ["Brushed Gold", "gold"],
                        ["Polished Chrome", "chrome"],
                        ["Matte Black", "matte-black"],
                      ].map(([label, finish]) => (
                        <Link
                          key={finish}
                          href={`/shop?finish=${finish}`}
                          className="block rounded-xl px-4 py-3 text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-[#e3bc78]"
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="nav-link text-[11px] font-medium uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-[#e3bc78] focus-visible:text-[#e3bc78]"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="rounded-full p-2.5 text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label="Open product search"
              >
                <Search size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={toggleCart}
                className="relative rounded-full p-2.5 text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label={`Open shopping cart${itemCount > 0 ? `, ${itemCount} items` : ""}`}
              >
                <ShoppingBag size={20} aria-hidden="true" />
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0.4 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 18 }}
                    className="absolute right-0 top-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold leading-none text-[#1c1917]"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="rounded-full p-2.5 text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 lg:hidden"
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
              >
                <Menu size={22} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Product search"
            className="fixed inset-0 z-[60] flex items-start justify-center bg-stone-950/95 px-6 pt-32 backdrop-blur-sm"
            onClick={(event) => {
              if (event.target === event.currentTarget) setSearchOpen(false);
            }}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="w-full max-w-2xl"
            >
              <form onSubmit={handleSearch} className="relative">
                <label htmlFor="site-search" className="sr-only">
                  Search products
                </label>
                <input
                  id="site-search"
                  ref={searchRef}
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search products..."
                  className="w-full border-b-2 border-amber-500 bg-transparent py-4 pr-12 text-2xl font-light text-white outline-none placeholder:text-white/50 focus-visible:border-amber-300 sm:text-3xl"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-label="Submit product search"
                >
                  <Search size={24} aria-hidden="true" />
                </button>
              </form>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="mt-6 rounded-sm py-2 text-sm font-medium uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                Close search
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-[60] bg-stone-950 lg:hidden"
          >
            <div className="flex h-full flex-col px-8 py-8">
              <div className="mb-12 flex items-center justify-between sm:mb-16">
                <Logo onClick={() => setMenuOpen(false)} />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-label="Close navigation menu"
                >
                  <X size={24} aria-hidden="true" />
                </button>
              </div>

              <nav aria-label="Mobile navigation links" className="flex flex-1 flex-col gap-7 overflow-y-auto">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-display text-3xl font-light tracking-tight text-white transition-colors hover:text-amber-300 focus-visible:text-amber-300 sm:text-4xl"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="border-t border-white/15 pt-6">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">BATHAE · Elevate the Everyday</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
