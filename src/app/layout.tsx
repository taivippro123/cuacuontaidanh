import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { rootSiteMetadata } from "@/lib/site";
import AppSiteShell from "./(site)/AppSiteShell";
import VercelAnalytics from "@/components/Common/VercelAnalytics";

export const metadata: Metadata = rootSiteMetadata;

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-vietnamese",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning={true}>
      <body className={beVietnamPro.variable}>
        <AppSiteShell>{children}</AppSiteShell>
        <VercelAnalytics />
      </body>
    </html>
  );
}
