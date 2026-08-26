import fs from 'fs';
import path from 'path';

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
};

const files = walk('./src');
let totalReplaced = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(/auto=format/g, 'auto=format&fm=webp');
  newContent = newContent.replace(/w=200&h=200&fit=crop'/g, 'w=200&h=200&fit=crop&fm=webp&q=75\'');
  newContent = newContent.replace(/w=400&h=500&fit=crop'/g, 'w=400&h=500&fit=crop&fm=webp&q=75\'');
  newContent = newContent.replace(/w=400&q=80'/g, 'w=400&q=75&fm=webp\'');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    totalReplaced++;
  }
});

console.log(`Updated images in ${totalReplaced} files`);
