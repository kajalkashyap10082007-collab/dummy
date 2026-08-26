import fs from 'fs';

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

  const replaceMap = {
    'bg-slate-900': 'bg-blue-700',
    'text-slate-900': 'text-blue-700',
    'border-slate-900': 'border-blue-700',
    'hover:bg-slate-800': 'hover:bg-blue-700', 
    'hover:text-slate-900': 'hover:text-blue-700',
    'hover:border-slate-900': 'hover:border-blue-700',
    
    'bg-slate-800': 'bg-blue-800',
    'hover:bg-slate-950': 'hover:bg-blue-800',
    
    'bg-slate-50': 'bg-blue-50',
    'border-slate-100': 'border-blue-100', 
    'bg-slate-100': 'bg-blue-100',
    
    'border-slate-200': 'border-blue-200',
    'bg-slate-200': 'bg-blue-200',

    'focus:ring-slate-900': 'focus:ring-blue-700',
    'accent-slate-900': 'accent-blue-700',
    'from-slate-900': 'from-blue-700',
  };

  for (const [key, value] of Object.entries(replaceMap)) {
    if (content.includes(key)) {
      content = content.split(key).join(value);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content);
  }
}
