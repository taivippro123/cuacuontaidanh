import type { Metadata } from "next";

/** Tên thương hiệu — dùng cho title template và OG */
export const SITE_NAME = "Cửa cuốn Tài Danh";

/** Tagline cho title dài hơn */
export const SITE_TAGLINE = "Cửa cuốn, cửa kéo chính hãng tại TP.HCM";

/** Title đầy đủ cho trang chủ (50+ chars) */
export const SITE_FULL_TITLE = `${SITE_NAME} - ${SITE_TAGLINE}`;

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
  "Cửa cuốn Tài Danh cung cấp và lắp đặt cửa cuốn, cửa kéo, bình lưu điện chính hãng tại TP.HCM. Bảo hành dài hạn, hỗ trợ 24/7.";

export const SITE_KEYWORDS = [
  "cửa cuốn",
  "cửa kéo",
  "motor cửa cuốn",
  "bình lưu điện cửa cuốn",
  "phụ kiện cửa cuốn",
  "cửa cuốn Dĩ An",
  "cửa cuốn Bình Dương",
  "cửa cuốn HCM",
  "cửa cuốn Thủ Đức",
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

export const DEFAULT_OG_IMAGE = "/images/og/og-default.png";

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
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
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
  /** Tuỳ chọn: ảnh OG */
  image?: string;
};

export function pageMetadata({ title, description, path, image }: PageMetaInput): Metadata {
  const canonical = new URL(path, SITE_PRIMARY_ORIGIN).toString();
  const fullOgTitle = `${title} | ${SITE_NAME}`;
  const ogImage = image || DEFAULT_OG_IMAGE;

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
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title: fullOgTitle,
      description,
      images: [ogImage],
    },
  };
}

type ProductMetaInput = {
  slug: string;
  title: string;
  description: string;
  image: string;
  /** Tuỳ chọn: keywords */
  keywords?: string[];
};

/** Metadata chuyên biệt cho trang sản phẩm chi tiết */
export function productMetadata({
  slug,
  title,
  description,
  image,
  keywords,
}: ProductMetaInput): Metadata {
  const path = `/san-pham/${slug}`;
  const canonical = new URL(path, SITE_PRIMARY_ORIGIN).toString();
  const fullOgTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullOgTitle,
      description,
      url: canonical,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullOgTitle,
      description,
      images: [image],
    },
  };
}

/** Trang chủ: title tuyệt đối, không thêm suffix. */
export function homeMetadata(): Metadata {
  const canonical = new URL("/", SITE_PRIMARY_ORIGIN).toString();
  return {
    title: { absolute: SITE_FULL_TITLE },
    description: SITE_DESCRIPTION,
    alternates: { canonical },
    openGraph: {
      title: SITE_FULL_TITLE,
      description: SITE_DESCRIPTION,
      url: canonical,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_FULL_TITLE,
      description: SITE_DESCRIPTION,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
