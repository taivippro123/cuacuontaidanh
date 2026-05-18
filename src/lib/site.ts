import type { Metadata } from "next";

/** Tên thương hiệu — dùng cho title template và OG */
export const SITE_NAME = "Cửa cuốn Tài Danh";

/** Tagline cho title dài hơn */
export const SITE_TAGLINE =
  "Cửa cuốn, cửa kéo chính hãng tại TP.HCM";

/** Title đầy đủ cho trang chủ */
export const SITE_FULL_TITLE =
  `${SITE_NAME} - ${SITE_TAGLINE}`;

/**
 * Domain chính
 * Dùng vercel domain để tránh lỗi crawler OG
 */
export const SITE_PRIMARY_ORIGIN = (() => {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (
    fromEnv &&
    (fromEnv.startsWith("https://") ||
      fromEnv.startsWith("http://"))
  ) {
    return fromEnv.replace(/\/$/, "");
  }

  return "https://cuacuontaidanh.vercel.app";
})();

/** OG image dùng cùng domain */
export const getImageOrigin = (): string => {
  return SITE_PRIMARY_ORIGIN;
};

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

export const DEFAULT_OG_IMAGE =
  "/images/og/og-default.png";

/** Helper: tạo full URL cho OG image */
export const getFullOgImageUrl = (
  path: string = DEFAULT_OG_IMAGE
): string => {
  return new URL(path, getImageOrigin()).toString();
};

/** Metadata dùng chung */
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

    title: SITE_FULL_TITLE,

    description: SITE_DESCRIPTION,

    url: SITE_PRIMARY_ORIGIN,

    images: [
      {
        url: getFullOgImageUrl(),
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

    images: [getFullOgImageUrl()],
  },

  robots: {
    index: true,
    follow: true,
  },
};

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  image,
}: PageMetaInput): Metadata {
  const canonical = new URL(
    path,
    SITE_PRIMARY_ORIGIN
  ).toString();

  const fullOgTitle =
    `${title} | ${SITE_NAME}`;

  const ogImage = image
    ? new URL(image, getImageOrigin()).toString()
    : getFullOgImageUrl();

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

      type: "website",

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
      card: "summary_large_image",

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
  keywords?: string[];
};

/** Metadata cho trang sản phẩm */
export function productMetadata({
  slug,
  title,
  description,
  image,
  keywords,
}: ProductMetaInput): Metadata {
  const path = `/san-pham/${slug}`;

  const canonical = new URL(
    path,
    SITE_PRIMARY_ORIGIN
  ).toString();

  const fullOgTitle =
    `${title} | ${SITE_NAME}`;

  const ogImage = new URL(
    image,
    getImageOrigin()
  ).toString();

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

      type: "article",

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
      card: "summary_large_image",

      title: fullOgTitle,

      description,

      images: [ogImage],
    },
  };
}

/** Metadata cho trang chủ */
export function homeMetadata(): Metadata {
  const canonical = new URL(
    "/",
    SITE_PRIMARY_ORIGIN
  ).toString();

  return {
    title: {
      absolute: SITE_FULL_TITLE,
    },

    description: SITE_DESCRIPTION,

    keywords: SITE_KEYWORDS,

    alternates: {
      canonical,
    },

    openGraph: {
      title: SITE_FULL_TITLE,

      description: SITE_DESCRIPTION,

      url: canonical,

      type: "website",

      siteName: SITE_NAME,

      locale: "vi_VN",

      images: [
        {
          url: getFullOgImageUrl(),
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

      images: [getFullOgImageUrl()],
    },
  };
}