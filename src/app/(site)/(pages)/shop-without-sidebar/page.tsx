import ShopWithoutSidebar from "@/components/ShopWithoutSidebar";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Sản phẩm (không sidebar)",
  description:
    "Xem toàn bộ sản phẩm cửa cuốn Cửa cuốn Tài Danh – bố cục lưới đơn giản, dễ duyệt.",
  path: "/shop-without-sidebar",
});

const ShopWithoutSidebarPage = () => {
  return (
    <main>
      <ShopWithoutSidebar />
    </main>
  );
};

export default ShopWithoutSidebarPage;
