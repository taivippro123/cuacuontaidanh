import Contact from "@/components/Contact";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Liên hệ",
  description:
    "Liên hệ Cửa cuốn Tài Danh – tư vấn báo giá, khảo sát và hỗ trợ lắp đặt cửa cuốn.",
  path: "/contact",
});

const ContactPage = () => {
  return (
    <main>
      <Contact />
    </main>
  );
};

export default ContactPage;
