import fs from 'fs';
import { globSync } from 'glob'; // Assuming glob is installed, if not we will just use basic fs search, wait, we had error with glob earlier.

// Use a simple recursive function instead of glob
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(`${dir}/${file}`);
    if (stat.isDirectory()) {
      findFiles(`${dir}/${file}`, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(`${dir}/${file}`);
    }
  }
  return fileList;
}

const files = findFiles('src');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace blue-700 with slate-900 for "Deep Fashion Blue"
  if (content.includes('blue-700')) {
    content = content.replace(/bg-blue-700/g, 'bg-slate-900');
    content = content.replace(/text-blue-700/g, 'text-slate-900');
    content = content.replace(/border-blue-700/g, 'border-slate-900');
    content = content.replace(/hover:bg-blue-700/g, 'hover:bg-slate-800');
    content = content.replace(/hover:text-blue-700/g, 'hover:text-slate-900');
    content = content.replace(/hover:border-blue-700/g, 'hover:border-slate-900');
    changed = true;
  }
  
  // Replace blue-800
  if (content.includes('blue-800')) {
    content = content.replace(/bg-blue-800/g, 'bg-slate-800');
    content = content.replace(/hover:bg-blue-800/g, 'hover:bg-slate-950');
    changed = true;
  }
  
  if (content.includes('blue-50')) {
    content = content.replace(/bg-blue-50/g, 'bg-slate-50');
    content = content.replace(/border-blue-50/g, 'border-slate-100');
    changed = true;
  }
  
  if (content.includes('blue-100')) {
    content = content.replace(/border-blue-100/g, 'border-slate-100');
    content = content.replace(/bg-blue-100/g, 'bg-slate-100');
    changed = true;
  }

  if (content.includes('blue-200')) {
    content = content.replace(/border-blue-200/g, 'border-slate-200');
    content = content.replace(/bg-blue-200/g, 'bg-slate-200');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
  }
}

