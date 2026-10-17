export const SITE_URL = 'https://dummy-mauve.vercel.app';

export interface PageSEO {
  path: string;
  title: string;
  description: string;
  canonicalPath?: string;
  noIndex?: boolean;
}

export const PAGE_SEO: Record<string, PageSEO> = {
  home: {
    path: '/',
    title: 'Clothify | Affordable Fashion for Every Style',
    description: 'Shop affordable fashion for men, women and kids at Clothify. Discover everyday clothing, fresh arrivals and easy-to-style outfits with online shopping.',
  },
  about: {
    path: '/about-clothify-sustainable-fashion',
    title: 'About Clothify | Affordable, Everyday Fashion',
    description: 'Learn about Clothify and our goal to make stylish, comfortable, quality fashion accessible for everyone, with clothing collections designed for everyday life.',
  },
  products: {
    path: '/products',
    title: 'Shop Affordable Clothing for Men, Women & Kids',
    description: 'Explore affordable clothing for men, women and kids at Clothify. Shop dresses, shirts, jeans, tops and everyday styles with fresh looks for every occasion.',
  },
  premiumCollection: {
    path: '/premium-clothing-collection',
    title: 'Shop Premium Clothing Online | Clothify',
    description: 'Discover premium clothing at Clothify, from everyday shirts and dresses to jeans and kidswear. Explore versatile styles, find your fit and shop online today.',
    canonicalPath: '/products',
  },
  blog: {
    path: '/sustainable-fashion-blog',
    title: 'Fashion Tips & Trends | Clothify Journal',
    description: 'Explore fashion trends, outfit ideas and practical styling tips on the Clothify journal. Find fresh inspiration for building a versatile everyday wardrobe.',
  },
  contact: {
    path: '/contact-clothify',
    title: 'Contact Clothify | Fashion Customer Support',
    description: 'Contact the Clothify customer support team for help with products, orders or general questions. We are here to make your shopping experience easy and enjoyable.',
  },
  cart: {
    path: '/cart',
    title: 'Shopping Cart | Clothify',
    description: 'View your Clothify shopping cart and review selected clothing, quantities and order totals before continuing to secure online checkout. Review your order.',
    noIndex: true,
  },
  wishlist: {
    path: '/wishlist',
    title: 'Clothing Wishlist | Clothify',
    description: 'Save favorite clothing and accessories to your Clothify wishlist, then return anytime to review your picks and shop your preferred styles. Return when ready.',
    noIndex: true,
  },
  checkout: {
    path: '/checkout',
    title: 'Secure Checkout | Clothify',
    description: 'Complete your Clothify clothing order by confirming your contact details, delivery address and preferred payment method at checkout. Place your order securely.',
    noIndex: true,
  },
  login: {
    path: '/login',
    title: 'Sign In or Create an Account | Clothify',
    description: 'Sign in to your Clothify account to manage your profile, discover new fashion collections and enjoy a smoother online shopping experience. Sign in online.',
    noIndex: true,
  },
  orderConfirmation: {
    path: '/order-confirmation',
    title: 'Order Confirmation | Clothify',
    description: 'Your Clothify order confirmation and delivery details will appear here after a successful purchase. Thank you for shopping our clothing collection today.',
    noIndex: true,
  },
  notFound: {
    path: '/404',
    title: 'Page Not Found | Clothify',
    description: 'We could not find the Clothify page you requested. Visit our clothing shop to explore the latest fashion collections and everyday styles. Browse our shop.',
    noIndex: true,
  },
};

export function getProductSEO(name: string, category: string) {
  const title = `${name} | Clothify`;
  let description = `${name} for ${category.toLowerCase()} at Clothify. Shop comfortable everyday fashion with quality details, fresh colors and convenient online delivery across India.`;

  if (description.length < 150) {
    description += ' Shop online today.';
  }
  if (description.length > 160) {
    description = `${description.slice(0, 157).trimEnd().replace(/[.,;:!?-]+$/, '')}.`;
  }

  return { title, description };
}
