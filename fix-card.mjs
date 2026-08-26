import fs from 'fs';

let content = fs.readFileSync('src/components/ProductCard.tsx', 'utf8');

// Modify the outer container for a cleaner fashion editorial look
content = content.replace(
  /className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-100"/,
  'className="group flex flex-col bg-transparent overflow-hidden transition-all duration-500"'
);

// Update Quick Add button text and style
content = content.replace(
  /Quick Add/,
  'Quick View'
);
content = content.replace(
  /w-full bg-zinc-900\/95 backdrop-blur-sm text-white py-3 rounded-sm text-sm font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg/,
  'w-full bg-white text-zinc-900 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all shadow-sm'
);

// Update badge styles
content = content.replace(
  /bg-blue-700 text-white text-\[10px\] font-black px-2\.5 py-1 rounded-sm uppercase tracking-widest shadow-sm/,
  'bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider'
);
content = content.replace(
  /bg-white\/95 backdrop-blur-sm text-blue-700 text-\[10px\] font-black px-2\.5 py-1 rounded-sm uppercase tracking-widest shadow-sm border border-blue-100/,
  'bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider'
);

// Update category and rating
content = content.replace(
  /text-xs font-black uppercase tracking-widest text-blue-700/,
  'text-[10px] font-semibold uppercase tracking-widest text-zinc-500'
);

// Remove the star icon and replace with simple text rating or just keep it minimal
// content = content.replace(
//   /<div className="flex items-center text-yellow-500">[\s\S]*?<\/div>/,
//   ''
// );

// Update product name typography
content = content.replace(
  /text-sm font-bold text-zinc-900 hover:text-blue-700 transition-colors mb-2 line-clamp-1/,
  'text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors mb-1 line-clamp-1'
);

// Update price typography
content = content.replace(
  /text-sm font-black text-zinc-900/,
  'text-sm font-semibold text-zinc-900'
);

fs.writeFileSync('src/components/ProductCard.tsx', content);
