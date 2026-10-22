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
    title: 'Clothify | Online Fashion Store for Men, Women & Kids',
    description:
      'Shop affordable clothing for men, women and kids at Clothify. Explore everyday styles, fresh arrivals and versatile outfits in our online fashion store.',
  },

  about: {
    path: '/about-clothify-sustainable-fashion',
    title: 'About Clothify | Affordable Fashion for Men, Women & Kids',
    description:
      'Learn about Clothify and explore affordable clothing for men, women and kids. Discover our approach to everyday style, comfortable fashion and quality clothing.',
  },

  products: {
    path: '/products',
    title: 'Shop Affordable Clothing for Men, Women & Kids | Clothify',
    description:
      'Explore affordable clothing for men, women and kids at Clothify. Shop dresses, shirts, jeans, tops and everyday styles with fresh looks for every occasion.',
  },

  premiumCollection: {
    path: '/premium-clothing-collection',
    title: 'Shop Premium Clothing Online | Clothify',
    description:
      'Discover premium clothing at Clothify, from everyday shirts and dresses to jeans and kidswear. Explore versatile styles, find your fit and shop online today.',
    canonicalPath: '/products',
  },

  blog: {
    path: '/sustainable-fashion-blog',
    title: 'Fashion Tips, Trends & Styling Ideas | Clothify',
    description:
      'Discover fashion tips, clothing trends and outfit ideas for men, women and kids. Explore everyday styling inspiration and affordable fashion ideas on the Clothify blog.',
  },

  contact: {
    path: '/contact-clothify',
    title: 'Contact Clothify | Customer Support & Enquiries',
    description:
      'Contact Clothify for questions about clothing, products, orders or styling. Reach our customer support team for help with your shopping enquiries and general questions.',
  },

  cart: {
    path: '/cart',
    title: 'Shopping Cart | Clothify',
    description:
      'View your Clothify shopping cart and review selected clothing, quantities and order totals before continuing to secure online checkout. Review your order.',
    noIndex: true,
  },

  wishlist: {
    path: '/wishlist',
    title: 'Clothing Wishlist | Clothify',
    description:
      'Save favorite clothing and accessories to your Clothify wishlist, then return anytime to review your picks and shop your preferred styles. Return when ready.',
    noIndex: true,
  },

  checkout: {
    path: '/checkout',
    title: 'Secure Checkout | Clothify',
    description:
      'Complete your Clothify clothing order by confirming your contact details, delivery address and preferred payment method at checkout. Place your order securely.',
    noIndex: true,
  },

  login: {
    path: '/login',
    title: 'Sign In or Create an Account | Clothify',
    description:
      'Sign in to your Clothify account to manage your profile, discover new fashion collections and enjoy a smoother online shopping experience. Sign in online.',
    noIndex: true,
  },

  orderConfirmation: {
    path: '/order-confirmation',
    title: 'Order Confirmation | Clothify',
    description:
      'Your Clothify order confirmation and delivery details will appear here after a successful purchase. Thank you for shopping our clothing collection today.',
    noIndex: true,
  },

  notFound: {
    path: '/404',
    title: 'Page Not Found | Clothify',
    description:
      'We could not find the Clothify page you requested. Visit our clothing shop to explore the latest fashion collections and everyday styles. Browse our shop.',
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