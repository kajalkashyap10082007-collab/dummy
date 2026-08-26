import fs from 'fs';

let content = fs.readFileSync('src/components/ProductCard.tsx', 'utf8');

if (!content.includes('QuickView')) {
  content = content.replace("import { motion } from 'motion/react';", "import { motion } from 'motion/react';\nimport { useState } from 'react';\nimport { QuickView } from './QuickView';");
  
  content = content.replace("const { toast } = useToast();", "const { toast } = useToast();\n  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);");
  
  content = content.replace(
    /<button onClick={\(e\) => { e.preventDefault\(\); e.stopPropagation\(\); navigate\(`\/product\/\${product.id}`\); }} className="w-full bg-zinc-900\/95/g, 
    '<button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsQuickViewOpen(true); }} className="w-full bg-zinc-900/95'
  );
  
  content = content.replace(
    /<\/motion.div>/,
    `  <QuickView product={product} isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} />\n    </motion.div>`
  );
  
  fs.writeFileSync('src/components/ProductCard.tsx', content);
}
