import Error from "@/components/Error";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Lỗi",
  description: "Trang thông báo lỗi – Cửa cuốn Tài Danh.",
  path: "/error",
});

const ErrorPage = () => {
  return (
    <main>
      <Error />
    </main>
  );
};

export default ErrorPage;
