import fs from 'fs';

let content = fs.readFileSync('src/pages/Products.tsx', 'utf8');

// Change mobileFiltersOpen to filtersOpen
content = content.replace(/mobileFiltersOpen/g, 'filtersOpen');
content = content.replace(/setMobileFiltersOpen/g, 'setFiltersOpen');

// Make the filter button visible on desktop (remove md:hidden)
content = content.replace(
  'className="md:hidden p-3 border border-zinc-200 bg-zinc-50 rounded-md text-zinc-600 min-w-[44px] min-h-[44px] flex items-center justify-center w-full sm:w-auto"',
  'className="p-3 border border-zinc-200 bg-white hover:bg-zinc-50 rounded-sm text-zinc-600 font-bold uppercase tracking-widest text-xs min-w-[44px] min-h-[44px] flex items-center justify-center w-full sm:w-auto transition-colors"'
);

// Remove the inline desktop sidebar
content = content.replace(
  /<aside className="hidden md:block w-64 flex-shrink-0">[\s\S]*?<\/aside>/,
  ''
);

// Remove "Mobile Filters Drawer" comment to just "Filters Drawer"
content = content.replace(/{\/\* Mobile Filters Drawer \*\/}/, '{/* Filters Drawer */}');

fs.writeFileSync('src/pages/Products.tsx', content);
