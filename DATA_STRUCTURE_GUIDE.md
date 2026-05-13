# Data Structure Setup

Tôi đã tạo hệ thống cấu trúc dữ liệu cho danh mục (categories) và sản phẩm (products). Dưới đây là hướng dẫn sử dụng:

## 📁 Cấu trúc File

```
public/data/
├── categories.json    # Chứa danh sách danh mục
└── products.json      # Chứa danh sách sản phẩm

src/utils/
├── dataFetcher.ts     # Utility functions để fetch dữ liệu
└── USAGE_EXAMPLES.ts  # Ví dụ sử dụng

src/types/
├── category.ts        # Type definition cho Category
└── product.ts         # Type definition cho Product
```

## 📋 Schema của Dữ Liệu

### Categories (categories.json)
```json
{
  "id": 1,
  "title": "Electronics",
  "slug": "electronics",
  "img": "/images/categories/electronics.png" // Optional
}
```

**Các trường:**
- `id` (number): ID duy nhất của danh mục
- `title` (string): Tên danh mục
- `slug` (string, optional): URL-friendly identifier
- `img` (string, optional): Đường dẫn ảnh danh mục

### Products (products.json)
```json
{
  "id": 1,
  "title": "Product Name",
  "slug": "product-name",
  "description": "Product description",
  "price": 99.99,
  "discountedPrice": 49.99,
  "reviews": 10,
  "image": "/images/products/product-1.png",
  "categoryId": 1,
  "imgs": {
    "thumbnails": ["/images/products/thumb-1.png"],
    "previews": ["/images/products/preview-1.png"]
  }
}
```

**Các trường:**
- `id` (number): ID duy nhất của sản phẩm
- `title` (string): Tên sản phẩm
- `slug` (string): URL-friendly identifier
- `description` (string): Mô tả sản phẩm
- `price` (number): Giá gốc
- `discountedPrice` (number): Giá khuyến mãi
- `reviews` (number): Số lượng đánh giá
- `image` (string): Đường dẫn ảnh chính
- `categoryId` (number): ID của danh mục
- `imgs` (object): Chứa thumbnails và previews

## 🔧 API Functions

### getCategories()
```typescript
const categories = await getCategories();
// Trả về: Category[]
```

### getProducts()
```typescript
const products = await getProducts();
// Trả về: ProductData[]
```

### getProductById(id)
```typescript
const product = await getProductById(1);
// Trả về: ProductData | null
```

### getProductsByCategory(categoryId)
```typescript
const products = await getProductsByCategory(1);
// Trả về: ProductData[] chứa các sản phẩm của danh mục
```

### getCategoryById(id)
```typescript
const category = await getCategoryById(1);
// Trả về: Category | null
```

### getCategoryBySlug(slug)
```typescript
const category = await getCategoryBySlug("electronics");
// Trả về: Category | null
```

### getProductBySlug(slug)
```typescript
const product = await getProductBySlug("iphone-14-plus");
// Trả về: ProductData | null
```

## 💡 Ví dụ Sử dụng

### 1. Server Component - Hiển thị tất cả sản phẩm

```typescript
// src/app/(site)/(pages)/shop/page.tsx
import { getProducts } from "@/utils/dataFetcher";
import ProductItem from "@/components/Common/ProductItem";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          item={{
            title: product.title,
            slug: product.slug,
            description: product.description,
            price: product.price,
            discountedPrice: product.discountedPrice,
            reviews: product.reviews,
            id: product.id,
            image: product.image,
            imgs: product.imgs,
          }}
        />
      ))}
    </div>
  );
}
```

### 2. Client Component - Hiển thị danh mục và sản phẩm

```typescript
// src/components/CategoryProducts/index.tsx
"use client";

import { useEffect, useState } from "react";
import { getCategories, getProductsByCategory } from "@/utils/dataFetcher";
import type { Category, ProductData } from "@/utils/dataFetcher";

export default function CategoryProducts() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  // Load danh mục
  useEffect(() => {
    async function loadCategories() {
      const data = await getCategories();
      setCategories(data);
      if (data.length > 0) {
        setSelectedCategoryId(data[0].id);
      }
      setLoading(false);
    }

    loadCategories();
  }, []);

  // Load sản phẩm khi danh mục thay đổi
  useEffect(() => {
    async function loadProducts() {
      if (selectedCategoryId) {
        const data = await getProductsByCategory(selectedCategoryId);
        setProducts(data);
      }
    }

    loadProducts();
  }, [selectedCategoryId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Category Buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategoryId(category.id)}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              selectedCategoryId === category.id
                ? "bg-blue text-white"
                : "bg-gray-2 text-dark hover:bg-gray-3"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-blue font-bold">${product.discountedPrice}</span>
                  <span className="text-gray-400 line-through ml-2">${product.price}</span>
                </div>
                <button className="bg-blue text-white px-3 py-1 rounded text-sm hover:bg-blue-dark">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 3. Dynamic Product Detail Page

```typescript
// src/app/(site)/(pages)/product/[slug]/page.tsx
import { getProductBySlug } from "@/utils/dataFetcher";
import Image from "next/image";

interface PageParams {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageParams) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div>
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            className="w-full rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Pricing */}
          <div className="mb-6">
            <p className="text-2xl font-bold text-blue">${product.discountedPrice}</p>
            <p className="text-gray-400 line-through">${product.price}</p>
            <p className="text-green-600 font-semibold mt-2">
              Save {Math.round((1 - product.discountedPrice / product.price) * 100)}%
            </p>
          </div>

          {/* Reviews */}
          <p className="text-gray-600 mb-6">⭐ {product.reviews} reviews</p>

          {/* Add to Cart */}
          <button className="w-full bg-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-dark transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
```

## 🔄 Cách Thêm Dữ Liệu Mới

### Thêm Danh Mục
Chỉnh sửa `public/data/categories.json`:
```json
{
  "id": 7,
  "title": "New Category",
  "slug": "new-category",
  "img": "/images/categories/new.png"
}
```

### Thêm Sản Phẩm
Chỉnh sửa `public/data/products.json`:
```json
{
  "id": 9,
  "title": "New Product",
  "slug": "new-product",
  "description": "Description here",
  "price": 99.99,
  "discountedPrice": 49.99,
  "reviews": 0,
  "image": "/images/products/new.png",
  "categoryId": 1,
  "imgs": {
    "thumbnails": ["/images/products/thumb-new.png"],
    "previews": ["/images/products/preview-new.png"]
  }
}
```

## ✅ Lợi Ích

✓ Dữ liệu tập trung trong JSON files  
✓ Dễ dàng thêm/sửa/xóa danh mục và sản phẩm  
✓ Hỗ trợ Server Components và Client Components  
✓ Type-safe với TypeScript  
✓ Có thể dễ dàng chuyển sang API/Database sau này  
✓ SEO-friendly với slug URLs  
