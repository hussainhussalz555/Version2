"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, CATEGORIES, FINISHES } from "@/lib/products";
import type { Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

function ShopContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");
  const [activeFinish, setActiveFinish] = useState(searchParams.get("finish") || "all");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = products
    .filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const matchFinish = activeFinish === "all" || p.finish === activeFinish;
      const matchSearch =
        searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchFinish && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      return 0;
    });

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setActiveFinish("all");
    setSortBy("default");
  };

  const hasActiveFilters =
    searchQuery || activeCategory !== "all" || activeFinish !== "all" || sortBy !== "default";

  return (
    <div className="pt-20 min-h-screen bg-stone-50">
      {/* Page Header */}
      <div className="bg-white border-b border-stone-200 py-16 px-6 lg:px-12">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-[11px] text-amber-500 tracking-[0.3em] uppercase font-medium mb-3">
              Browse
            </p>
            <h1 className="text-5xl font-light text-stone-900">Shop All</h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-11 pr-4 py-3 border border-stone-200 bg-white text-sm text-stone-800 outline-none focus:border-stone-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile filters toggle */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="md:hidden flex items-center gap-2 border border-stone-200 bg-white px-4 py-3 text-sm text-stone-600 hover:border-stone-400 transition-colors"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border border-stone-200 bg-white text-sm text-stone-700 px-4 py-3 outline-none focus:border-stone-400 transition-colors"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A–Z</option>
            </select>

            {/* Results count */}
            <span className="text-sm text-stone-400 hidden md:block">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Sidebar Filters */}
          <aside
            className={`${
              filtersOpen ? "block" : "hidden"
            } md:block w-full md:w-56 flex-shrink-0`}
          >
            <div className="space-y-8">
              {/* Category */}
              <div>
                <h3 className="text-[11px] text-stone-400 tracking-[0.25em] uppercase font-medium mb-4">
                  Category
                </h3>
                <ul className="space-y-2">
                  {CATEGORIES.map((cat) => (
                    <li key={cat.id}>
                      <button
                        onClick={() => setActiveCategory(cat.id)}
                        className={`text-sm w-full text-left py-1.5 transition-colors ${
                          activeCategory === cat.id
                            ? "text-stone-900 font-semibold"
                            : "text-stone-500 hover:text-stone-800"
                        }`}
                      >
                        {cat.label}
                        {activeCategory === cat.id && (
                          <span className="ml-2 inline-block w-1 h-1 bg-amber-500 rounded-full align-middle" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Finish */}
              <div>
                <h3 className="text-[11px] text-stone-400 tracking-[0.25em] uppercase font-medium mb-4">
                  Finish
                </h3>
                <ul className="space-y-2">
                  {FINISHES.map((fin) => (
                    <li key={fin.id}>
                      <button
                        onClick={() => setActiveFinish(fin.id)}
                        className={`text-sm w-full text-left py-1.5 transition-colors ${
                          activeFinish === fin.id
                            ? "text-stone-900 font-semibold"
                            : "text-stone-500 hover:text-stone-800"
                        }`}
                      >
                        {fin.label}
                        {activeFinish === fin.id && fin.id !== "all" && (
                          <span className="ml-2 inline-block w-1 h-1 bg-amber-500 rounded-full align-middle" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clear */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-stone-400 hover:text-stone-700 underline underline-offset-4 transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-5xl mb-4">◇</p>
                <p className="text-stone-400 text-lg font-light">No products match your filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-sm text-stone-500 hover:text-stone-800 underline underline-offset-4"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-20 min-h-screen bg-stone-50" />}>
      <ShopContent />
    </Suspense>
  );
}
