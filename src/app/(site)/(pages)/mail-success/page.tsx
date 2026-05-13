import MailSuccess from "@/components/MailSuccess";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Gửi liên hệ thành công",
  description:
    "Cảm ơn bạn đã liên hệ Cửa cuốn Tài Danh. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.",
  path: "/mail-success",
});

const MailSuccessPage = () => {
  return (
    <main>
      <MailSuccess />
    </main>
  );
};

export default MailSuccessPage;
