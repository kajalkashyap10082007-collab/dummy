import { BlogPost, Product, Testimonial } from './types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Elegant Evening Gown',
    price: 8999,
    originalPrice: 12999,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    isTrending: true
  },
  {
    id: 'p2',
    name: 'Premium Wool Blend Coat',
    price: 6499,
    originalPrice: 8999,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1520975954732-57dd22299614?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1550995694-3f5f4a7e1bd2?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    isTrending: true
  },
  {
    id: 'p3',
    name: 'Signature Leather Handbag',
    price: 5299,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    isTrending: true
  },
  {
    id: 'p4',
    name: 'Classic White Sneakers',
    price: 3499,
    originalPrice: 4999,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    isTrending: true
  },
  {
    id: 'p5',
    name: 'Summer Floral Maxi Dress',
    price: 3999,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&q=80&w=800',
    rating: 4.6
  },
  {
    id: 'p6',
    name: 'Tailored Fit Suit Jacket',
    price: 7999,
    originalPrice: 10999,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae46af508?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800',
    rating: 4.8
  },
  {
    id: 'p7',
    name: 'Oversized Silk Blouse',
    price: 2899,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1485230895905-23e3abf11fc5?auto=format&fit=crop&q=80&w=800',
    rating: 4.5
  },
  {
    id: 'p8',
    name: 'Vintage Aviator Sunglasses',
    price: 1899,
    originalPrice: 2499,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1508296695146-257a814050b4?auto=format&fit=crop&q=80&w=800',
    rating: 4.4
  },
  {
    id: 'p9',
    name: 'Formal Leather Oxfords',
    price: 4599,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1614252232525-a111316b1f5e?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd618134?auto=format&fit=crop&q=80&w=800',
    rating: 4.7
  },
  {
    id: 'p10',
    name: 'Chunky Knit Sweater',
    price: 3299,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
    rating: 4.8
  },
  {
    id: 'p11',
    name: 'Minimalist Chronograph Watch',
    price: 5999,
    originalPrice: 7999,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    isTrending: true
  },
  {
    id: 'p12',
    name: 'Urban Streetwear Hoodie',
    price: 2499,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800',
    rating: 4.6
  },
  {
    id: 'p13',
    name: 'Kids Playful Graphic T-Shirt',
    price: 899,
    category: 'Kids',
    image: 'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    isTrending: true
  },
  {
    id: 'p14',
    name: 'Kids Denim Jacket',
    price: 2499,
    originalPrice: 3499,
    category: 'Kids',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e7?auto=format&fit=crop&q=80&w=800',
    rating: 4.6
  },
  {
    id: 'p15',
    name: 'Cute Summer Dress',
    price: 1899,
    category: 'Kids',
    image: 'https://images.unsplash.com/photo-1612218086036-7c0a6b7d5598?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    isTrending: true
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Ultimate Fall 2026 Trend Guide',
    excerpt: 'Discover the essential pieces you need to transition your wardrobe smoothly into the colder months with style.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
    date: 'Sep 12, 2026',
    category: 'Trends'
  },
  {
    id: 'b2',
    title: 'Sustainable Fashion: Why It Matters Now',
    excerpt: 'How leading brands are shifting towards eco-friendly materials and what you can do to curate a sustainable closet.',
    image: 'https://images.unsplash.com/photo-1489987701169-8069e4d0cb53?auto=format&fit=crop&q=80&w=800',
    date: 'Aug 28, 2026',
    category: 'Sustainability'
  },
  {
    id: 'b3',
    title: '5 Ways to Style a Classic White Tee',
    excerpt: 'Unlock the versatility of the humble white t-shirt. From casual daytime looks to elevated evening ensembles.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    date: 'Aug 15, 2026',
    category: 'Styling'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Fashion Blogger',
    content: 'Clothify is my go-to for modern, affordable pieces that look designer. The quality of their linen collection is unmatched.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't2',
    name: 'David Chen',
    role: 'Creative Director',
    content: 'The user experience on this site is incredible. I found the perfect leather sneakers, and the shipping was lightning fast.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't3',
    name: 'Emma Thompson',
    role: 'Loyal Customer',
    content: 'I appreciate their commitment to sustainable fashion without compromising on style. Their accessory line is a hidden gem!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'
  }
];
