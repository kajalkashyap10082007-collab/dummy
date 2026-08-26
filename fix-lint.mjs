import fs from 'fs';

let content = fs.readFileSync('src/pages/Home.tsx', 'utf8');
content = content.replace('import { products, testimonials }', 'import { products }');
fs.writeFileSync('src/pages/Home.tsx', content);
