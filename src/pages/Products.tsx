import { useState, useMemo, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { products } from "../data";
import { Search } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { SEO } from "../components/SEO";
import type { Product } from "../types";

export function Products() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo<Product[]>(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const productsSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Shop Premium Clothing for Men, Women & Kids",
    "description":
      "Browse Clothify's extensive collection of premium clothing, ethical fashion, and sustainable apparel for men, women, and kids.",
    "url":
      "https://dummy-mauve.vercel.app/premium-clothing-collection",
    "hasPart": filteredProducts.slice(0, 10).map((p) => ({
      "@type": "Product",
      "name": p.name,
      "image": p.image,
      "offers": {
        "@type": "Offer",
        "price": p.price,
        "priceCurrency": "INR",
      },
    })),
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <SEO
        title="Shop Premium Clothing & Ethical Fashion | Clothify"
        description="Browse Clothify's extensive collection of premium clothing, ethical fashion, and sustainable apparel for men, women, and kids."
        schemaMarkup={productsSchema}
        canonicalUrl="https://dummy-mauve.vercel.app/premium-clothing-collection"
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">

        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-zinc-900 mb-2">
            Shop Premium Clothing for Men, Women & Kids
          </h1>

          <p className="text-zinc-500 text-sm">
            Showing {filteredProducts.length} Products
          </p>
        </div>


        {/* Search Box */}
        <div className="relative w-full md:w-80">

          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white py-3 pl-11 pr-4 text-sm text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          />

          <Search
            className="absolute left-3 top-3.5 text-zinc-400"
            size={18}
          />

        </div>

      </div>


      {/* Products */}
      {filteredProducts.length === 0 ? (

        <div className="text-center py-24">

          <h2 className="text-2xl font-semibold text-zinc-900 mb-3">
            No Products Found
          </h2>

          <p className="text-zinc-500">
            Try searching with another product name.
          </p>

        </div>

      ) : (

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >

          <AnimatePresence>

            {filteredProducts.map((product) => (

              <motion.div
                key={product.id}
                layout
                initial={{
                  opacity: 0,
                  scale: 0.95
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95
                }}
                transition={{
                  duration: 0.3
                }}
              >

                <ProductCard product={product} />

              </motion.div>

            ))}

          </AnimatePresence>

        </motion.div>

      )}

    </div>
  );
}