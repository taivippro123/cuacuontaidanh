/**
 * EXAMPLES OF HOW TO USE THE DATA FETCHER
 * 
 * This file demonstrates how to use the dataFetcher utility in your components
 * to load categories and products from the JSON files.
 */

// ===== EXAMPLE 1: Server Component to Display All Products =====
// File: src/app/(site)/(pages)/shop/page.tsx

/*
import { getProducts } from "@/utils/dataFetcher";
import ProductItem from "@/components/Common/ProductItem";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          item={{
            title: product.title,
            slug: product.slug,
            description: product.description,
            price: product.price,
            discountedPrice: product.discountedPrice,
            reviews: product.reviews,
            id: product.id,
            image: product.image,
            imgs: product.imgs,
          }}
        />
      ))}
    </div>
  );
}
*/

// ===== EXAMPLE 2: Client Component with useEffect to Load Products =====
// File: src/components/Shop/ProductList.tsx

/*
"use client";

import { useEffect, useState } from "react";
import { getProducts, ProductData } from "@/utils/dataFetcher";
import ProductItem from "@/components/Common/ProductItem";

export default function ProductList() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }

    loadProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p className="price">${product.price}</p>
        </div>
      ))}
    </div>
  );
}
*/

// ===== EXAMPLE 3: Display Categories with Products =====
// File: src/components/Categories/CategoryGrid.tsx

/*
"use client";

import { useEffect, useState } from "react";
import { getCategories, getProductsByCategory, Category, ProductData } from "@/utils/dataFetcher";

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    async function loadCategories() {
      const data = await getCategories();
      setCategories(data);
      // Load products for first category by default
      if (data.length > 0) {
        setSelectedCategory(data[0].id);
        const categoryProducts = await getProductsByCategory(data[0].id);
        setProducts(categoryProducts);
      }
    }

    loadCategories();
  }, []);

  const handleCategoryChange = async (categoryId: number) => {
    setSelectedCategory(categoryId);
    const categoryProducts = await getProductsByCategory(categoryId);
    setProducts(categoryProducts);
  };

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`px-4 py-2 rounded ${
              selectedCategory === category.id
                ? "bg-blue text-white"
                : "bg-gray-2 text-dark"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
*/

// ===== EXAMPLE 4: Get Product by Slug (for product detail page) =====
// File: src/app/(site)/(pages)/product/[slug]/page.tsx

/*
import { getProductBySlug } from "@/utils/dataFetcher";
import Image from "next/image";

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail">
      <Image
        src={product.image}
        alt={product.title}
        width={500}
        height={500}
      />
      <div>
        <h1>{product.title}</h1>
        <p className="description">{product.description}</p>
        <div className="pricing">
          <span className="price">${product.discountedPrice}</span>
          <span className="original-price">${product.price}</span>
        </div>
        <p className="reviews">Reviews: {product.reviews}</p>
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
}
*/

export {};
