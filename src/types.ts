export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'Men' | 'Women' | 'Shoes' | 'Accessories';
  image: string;
  hoverImage?: string;
  rating: number;
  isTrending?: boolean;
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
