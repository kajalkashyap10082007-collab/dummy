export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: 'Men' | 'Women' | 'Kids' | 'Shoes' | 'Accessories';
  image: string;
  imageAlt?: string;
  hoverImage?: string;
  images?: string[];
  description?: string;
  sizes?: string[];
  colors?: string[];
  rating: number;
  reviews?: number;
  isTrending?: boolean;
  isNewArrival?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}
