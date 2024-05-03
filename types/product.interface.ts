export interface Product {
    _id: string,
    title: string;
    slug: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    reviews: number;
    stock: number;
    categoryId: string;
    brand: string;
    thumbnail: string;
    images: string[];
    variant: Record<string, string[]>;
  }