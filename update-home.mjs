import fs from 'fs';

let content = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Remove CIRCULAR_CATEGORIES rendering
content = content.replace(/<div className="bg-white\/80 backdrop-blur-md border-b border-zinc-100 py-4 shadow-sm overflow-x-auto no-scrollbar">[\s\S]*?<\/div>\n      <\/div>/, '');

fs.writeFileSync('src/pages/Home.tsx', content);
