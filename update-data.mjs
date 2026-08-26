import fs from 'fs';
let content = fs.readFileSync('src/data.ts', 'utf8');

const sizes = "['XS', 'S', 'M', 'L', 'XL']";
const colors = "['Black', 'White', 'Navy', 'Beige']";
const desc = "'Crafted with premium materials for maximum comfort and style. This versatile piece is perfect for any occasion, offering a tailored fit and exceptional durability.'";

content = content.replace(/hoverImage:(.*),/g, `hoverImage:$1,\n    images: [$1, $1.replace('w=800', 'w=800&crop=1')],\n    description: ${desc},\n    sizes: ${sizes},\n    colors: ${colors},\n    reviews: Math.floor(Math.random() * 200) + 15,`);

// fix trailing commas
content = content.replace(/rating:(.*)\n/g, `rating:$1,\n`);
// if isTrending follows rating, the comma will be duplicate, let's fix it later.
// actually it's easier to replace rating: (.*), with rating: $1,\n reviews: ..., sizes: ...

fs.writeFileSync('src/data.ts', content);
