import React, { Suspense } from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Sản phẩm",
  description:
    "Danh mục cửa cuốn Cửa cuốn Tài Danh – lọc theo danh mục, xem nhanh và liên hệ đặt hàng.",
  path: "/san-pham",
});

type SearchParamsInput =
  | Promise<{ category?: string | string[] }>
  | { category?: string | string[] };

function pickCategoryQuery(
  sp: { category?: string | string[] } | undefined
): string | undefined {
  const raw = sp?.category;
  if (typeof raw === "string") return raw.trim() || undefined;
  if (Array.isArray(raw) && raw[0]) return String(raw[0]).trim() || undefined;
  return undefined;
}

const ShopWithSidebarPage = async ({
  searchParams,
}: {
  searchParams: SearchParamsInput;
}) => {
  const sp = await Promise.resolve(searchParams);
  const initialCategorySlug = pickCategoryQuery(sp);

  return (
    <main>
      <Suspense fallback={null}>
        <ShopWithSidebar initialCategorySlug={initialCategorySlug} />
      </Suspense>
    </main>
  );
};

export default ShopWithSidebarPage;
