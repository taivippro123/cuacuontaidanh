import type { Metadata } from "next";

/** Tên thương hiệu — dùng cho title template và OG */
export const SITE_NAME = "Cửa cuốn Tài Danh";

/**
 * Tên miền chính (canonical / metadataBase / sitemap).
 * Ghi đè khi deploy: đặt `NEXT_PUBLIC_SITE_URL` = URL đầy đủ (vd. `https://cuacuontaidanh.id.vn`).
 */
export const SITE_PRIMARY_ORIGIN = (() => {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (
    fromEnv &&
    (fromEnv.startsWith("https://") || fromEnv.startsWith("http://"))
  ) {
    return fromEnv.replace(/\/$/, "");
  }
  return "https://cuacuontaidanh.id.vn";
})();

/**
 * Tên miền phụ (Vercel). Dùng khi deploy preview; canonical vẫn trỏ về .id.vn.
 */
export const SITE_SECONDARY_ORIGIN = "https://cuacuontaidanh.vercel.app";

export const SITE_DESCRIPTION =
  "Cửa cuốn Tài Danh – tư vấn, cung cấp và lắp đặt cửa cuốn chất lượng, bảo hành rõ ràng.";

export const SITE_KEYWORDS = [
  "cửa cuốn",
  "cửa cuốn Tài Danh",
  "lắp đặt cửa cuốn",
  "cửa cuốn id.vn",
  "cửa cuốn tài danh",
  "của cuốn đài loan",
  "cửa cuốn giá rẻ",
  "cửa cuốn chất lượng",
  "cửa cuốn bảo hành",
  "cửa cuốn úc",
  "cửa cuốn nhật",
  "cửa cuốn hàn quốc",
  "cửa cuốn malaysia",
  "cửa cuốn philipines",
  "cửa cuốn thái lan",
  "cửa cuốn indonesia",
  "cửa cuốn myanmar",
  "cửa cuốn việt nam",
  "cửa cuốn đức",
];

/** Metadata dùng chung ở root layout (title template, OG mặc định, robots). */
export const rootSiteMetadata: Metadata = {
  metadataBase: new URL(SITE_PRIMARY_ORIGIN),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

type PageMetaInput = {
  /** Phần đầu title (sẽ ghép với template `| Cửa cuốn Tài Danh`) — trang chủ dùng `absoluteTitle` thay vì field này */
  title: string;
  description: string;
  /** Đường dẫn pathname, ví dụ `/contact` */
  path: string;
};

export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const canonical = new URL(path, SITE_PRIMARY_ORIGIN).toString();
  const fullOgTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullOgTitle,
      description,
      url: canonical,
    },
    twitter: {
      title: fullOgTitle,
      description,
    },
  };
}

/** Trang chủ: title tuyệt đối, không thêm suffix. */
export function homeMetadata(): Metadata {
  const canonical = new URL("/", SITE_PRIMARY_ORIGIN).toString();
  return {
    title: { absolute: SITE_NAME },
    description: SITE_DESCRIPTION,
    alternates: { canonical },
    openGraph: {
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: canonical,
    },
    twitter: {
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
    },
  };
}
