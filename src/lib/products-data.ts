import { readFile } from "fs/promises";
import path from "path";

export type ProductJson = {
  id: number;
  title: string;
  slug: string;
  description?: string;
  price?: number;
  discountedPrice?: number;
  reviews?: number;
  categoryId?: number;
  image?: string;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};

let cache: ProductJson[] | null = null;

export async function getProductsStatic(): Promise<ProductJson[]> {
  if (cache) return cache;
  const filePath = path.join(process.cwd(), "public", "data", "products.json");
  const raw = await readFile(filePath, "utf-8");
  cache = JSON.parse(raw) as ProductJson[];
  return cache;
}

export async function getProductSlugsStatic(): Promise<string[]> {
  const products = await getProductsStatic();
  return products.map((p) => p.slug).filter(Boolean);
}

export async function getProductBySlugStatic(
  slug: string
): Promise<ProductJson | null> {
  const products = await getProductsStatic();
  return products.find((p) => p.slug === slug) ?? null;
}
