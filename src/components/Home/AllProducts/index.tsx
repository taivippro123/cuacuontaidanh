"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import ProductItem from "@/components/Common/ProductItem";
import { getProducts, ProductData, getCategories, Category } from "@/utils/dataFetcher";

const AllProducts = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      setLoading(false);
    }
    loadData();
  }, []);

  // Group products by category
  const productsByCategory = useMemo(() => {
    const grouped = categories.map((category) => ({
      category,
      products: products.filter((p) => p.categoryId === category.id).slice(0, 8),
    }));
    return grouped.filter((group) => group.products.length > 0);
  }, [products, categories]);

  if (loading) {
    return (
      <section className="overflow-hidden pt-15 pb-15">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <p className="text-center text-gray-5 py-10">Đang tải sản phẩm…</p>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden pt-15 pb-15">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {productsByCategory.map((group) => (
          <div key={group.category.id} className="mb-15">
            <div className="mb-7 flex items-center justify-between gap-4">
              <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
                {group.category.title}
              </h2>
              <Link
                href={`/san-pham?category=${encodeURIComponent(group.category.slug)}`}
                className="text-custom-sm font-medium text-blue hover:text-blue-dark whitespace-nowrap shrink-0"
              >
                Xem tất cả
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9">
              {group.products.map((item) => (
                <ProductItem
                  key={item.id}
                  previewOnly
                  hideReviewCount
                  item={{
                    title: item.title,
                    categoryTitle: group.category.title,
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
