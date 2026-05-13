import React from "react";
import type { Metadata } from "next";
import ShopDetails from "@/components/ShopDetails";
import { getProductBySlugStatic } from "@/lib/products-data";
import { pageMetadata, SITE_NAME } from "@/lib/site";

interface ShopDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ShopDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlugStatic(slug);

  if (!product) {
    return pageMetadata({
      title: "Không tìm thấy sản phẩm",
      description: `Không có sản phẩm phù hợp – ${SITE_NAME}.`,
      path: `/shop-details/${slug}`,
    });
  }

  return pageMetadata({
    title: product.title,
    description:
      product.description?.trim() ||
      `Chi tiết sản phẩm ${product.title} – ${SITE_NAME}.`,
    path: `/shop-details/${product.slug}`,
  });
}

const ShopDetailsPage = async ({ params }: ShopDetailsPageProps) => {
  const { slug } = await params;

  return (
    <main>
      <ShopDetails slug={slug} />
    </main>
  );
};

export default ShopDetailsPage;
