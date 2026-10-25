export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Men' | 'Women' | 'Kids';
  image: string;
  imageAlt?: string;
  hoverImage?: string;
  images?: string[];
  description?: string;
  sizes?: string[];
  colors?: string[];
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
