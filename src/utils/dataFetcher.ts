// Utility functions to fetch data from JSON files

export interface Category {
  id: number;
  title: string;
  slug?: string;
  img?: string;
}

export interface ProductData {
  id: number;
  title: string;
  categoryTitle?: string;
  slug: string;
  description: string;
  price: number;
  discountedPrice: number;
  reviews: number;
  image: string;
  categoryId: number;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
}

/**
 * Fetch all categories from categories.json
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch("/data/categories.json");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

/**
 * Fetch all products from products.json
 */
export async function getProducts(): Promise<ProductData[]> {
  try {
    const response = await fetch("/data/products.json");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

/**
 * Fetch product by ID
 */
export async function getProductById(id: number): Promise<ProductData | null> {
  try {
    const products = await getProducts();
    return products.find((product) => product.id === id) || null;
  } catch (error) {
    console.error("Error fetching product by id:", error);
    return null;
  }
}

/**
 * Fetch products by category ID
 */
export async function getProductsByCategory(
  categoryId: number
): Promise<ProductData[]> {
  try {
    const products = await getProducts();
    return products.filter((product) => product.categoryId === categoryId);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

/**
 * Fetch category by ID
 */
export async function getCategoryById(id: number): Promise<Category | null> {
  try {
    const categories = await getCategories();
    return categories.find((category) => category.id === id) || null;
  } catch (error) {
    console.error("Error fetching category by id:", error);
    return null;
  }
}

/**
 * Fetch category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const categories = await getCategories();
    return categories.find((category) => category.slug === slug) || null;
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return null;
  }
}

/**
 * Fetch product by slug
 */
export async function getProductBySlug(slug: string): Promise<ProductData | null> {
  try {
    const products = await getProducts();
    return products.find((product) => product.slug === slug) || null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}
