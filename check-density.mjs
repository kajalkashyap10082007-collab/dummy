import fs from 'fs';

const homeContent = fs.readFileSync('src/pages/Home.tsx', 'utf8');
const dataContent = fs.readFileSync('src/data.ts', 'utf8');
const footerContent = fs.readFileSync('src/components/layout/Footer.tsx', 'utf8');
const navbarContent = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');

const combined = (homeContent + dataContent + footerContent + navbarContent).replace(/<[^>]+>/g, ' ').toLowerCase(); 
const words = combined.match(/\b\w+\b/g) || [];
const totalWords = words.length;

const countKeyword = (keyword) => {
  const regex = new RegExp('\\b' + keyword + '\\b', 'gi');
  const matches = combined.match(regex);
  return matches ? matches.length : 0;
};

const keywords = ['premium', 'clothing', 'fashion', 'ethical', 'sustainable', 'clothify', 'men', 'women', 'kids', 'accessories'];
console.log('--- Keyword Density Analysis ---');
console.log('Total words (approx):', totalWords);
keywords.forEach(kw => {
  const count = countKeyword(kw);
  const density = ((count / totalWords) * 100).toFixed(2);
  console.log(`- ${kw}: ${count} occurrences (${density}%)`);
});
