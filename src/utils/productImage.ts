/** Ảnh mặc định khi JSON không có previews/image (file có sẵn trong template) */
export const FALLBACK_PRODUCT_IMAGE = "/images/products/product-1-bg-1.png";

export type ProductImageSource = {
  image?: string;
  imgs?: {
    thumbnails?: string[];
    previews?: string[];
  };
};

/** Ảnh chính cho card / list (ưu tiên preview đầu, sau đó `image`) */
export function getProductMainImageSrc(item: ProductImageSource): string {
  const preview = item.imgs?.previews?.find(Boolean);
  if (preview) return preview;
  const img = item.image?.trim();
  if (img) return img;
  return FALLBACK_PRODUCT_IMAGE;
}

/** Các URL xem / lightbox (luôn có ít nhất một phần tử) */
export function getProductPreviewUrls(item: ProductImageSource): string[] {
  const previews = item.imgs?.previews?.filter(Boolean) ?? [];
  if (previews.length) return previews;
  const img = item.image?.trim();
  if (img) return [img];
  return [FALLBACK_PRODUCT_IMAGE];
}

/** Thumbnail sidebar: dùng thumbnails nếu có, không thì fallback preview */
export function getProductThumbnailUrls(item: ProductImageSource): string[] {
  const thumbs = item.imgs?.thumbnails?.filter(Boolean) ?? [];
  if (thumbs.length) return thumbs;
  return getProductPreviewUrls(item);
}
