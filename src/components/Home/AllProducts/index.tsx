"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProductItem from "@/components/Common/ProductItem";
import { getProducts, ProductData, getCategories } from "@/utils/dataFetcher";

const AllProducts = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);
      const categoryTitleById = Object.fromEntries(
        categoriesData.map((c) => [c.id, c.title])
      );
      const normalized = productsData.map((item) => ({
        ...item,
        categoryTitle: categoryTitleById[item.categoryId] ?? "",
      }));
      setProducts(normalized);
      setLoading(false);
    }
    loadProducts();
  }, []);

  return (
    <section className="overflow-hidden pt-15 pb-15">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="mb-7 flex items-center justify-between gap-4">
          <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
            Sản phẩm
          </h2>
          <Link
            href="/shop-with-sidebar"
            className="text-custom-sm font-medium text-blue hover:text-blue-dark whitespace-nowrap shrink-0"
          >
            Xem tất cả
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-5 py-10">Đang tải sản phẩm…</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9">
            {products.map((item) => (
              <ProductItem
                key={item.id}
                previewOnly
                hideReviewCount
                item={{
                  title: item.title,
                  categoryTitle: item.categoryTitle,
                  slug: item.slug,
                  description: item.description,
                  price: item.price,
                  discountedPrice: item.discountedPrice,
                  reviews: item.reviews,
                  id: item.id,
                  categoryId: item.categoryId,
                  imgs: item.imgs,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
