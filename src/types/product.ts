export type Product = {
  title: string;
  categoryTitle?: string;
  slug?: string;
  description?: string;
  reviews: number;
  price: number;
  discountedPrice: number;
  id: number;
  image?: string;
  categoryId?: number;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
  specifications?: Array<{
    key: string;
    value: string;
  }>;
};
