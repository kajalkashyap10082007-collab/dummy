import fs from 'fs';

let content = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');

// Update announcement bar
content = content.replace(
  /<div className="w-full text-center text-xs font-medium sm:text-sm tracking-wide sm:tracking-widest uppercase flex items-center justify-center gap-2">[\s\S]*?<\/div>/m,
  '<div className="w-full text-center text-xs font-bold sm:text-sm tracking-widest uppercase flex items-center justify-center">FREE SHIPPING ON ORDERS OVER ₹2,999 • SUMMER SALE IS LIVE</div>'
);

// Update search placeholder
content = content.replace(
  /placeholder="Search..."/,
  'placeholder="Search dresses, shirts, jeans, sneakers..."'
);
// Make the search input wider
content = content.replace(
  /w-48 focus:w-64/,
  'w-64 focus:w-80'
);

fs.writeFileSync('src/components/layout/Navbar.tsx', content);
