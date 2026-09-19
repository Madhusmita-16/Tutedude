const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DIR = __dirname;

const mockProducts = [
  {
    id: 1,
    title: "Essence Mascara Lash Princess",
    description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing effect.",
    price: 9.99,
    category: "beauty",
    thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
  },
  {
    id: 2,
    title: "Eyeshadow Palette with Mirror",
    description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow colors.",
    price: 19.99,
    category: "beauty",
    thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png"
  },
  {
    id: 3,
    title: "Powder Canister",
    description: "The Powder Canister is a finely milled setting powder designed to set makeup.",
    price: 14.99,
    category: "beauty",
    thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png"
  },
  {
    id: 4,
    title: "Red Lipstick",
    description: "The Red Lipstick is a classic choice for adding a pop of vibrant color.",
    price: 12.99,
    category: "beauty",
    thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png"
  },
  {
    id: 5,
    title: "Red Nail Polish",
    description: "The Red Nail Polish offers a rich glossy finish for stunning nails.",
    price: 8.99,
    category: "beauty",
    thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png"
  },
  {
    id: 6,
    title: "Calvin Klein CK One",
    description: "CK One by Calvin Klein is an iconic unisex fragrance for everyday wear.",
    price: 49.99,
    category: "fragrances",
    thumbnail: "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png"
  },
  {
    id: 7,
    title: "Chanel Coco Noir Eau De Parfum",
    description: "Chanel Coco Noir offers an elegant dark floral scent.",
    price: 129.99,
    category: "fragrances",
    thumbnail: "https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De%20Parfum/thumbnail.png"
  },
  {
    id: 8,
    title: "Dior J'adore",
    description: "J'adore by Dior is a glamorous floral fragrance loved worldwide.",
    price: 89.99,
    category: "fragrances",
    thumbnail: "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/thumbnail.png"
  }
];

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
};

http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];

  if (reqPath === '/api/products') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(JSON.stringify({ products: mockProducts }));
    return;
  }

  let filePath = path.join(DIR, reqPath === '/' ? 'index.html' : reqPath);
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'text/html';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('File Not Found');
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
      });
      res.end(content, 'utf-8');
    }
  });
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
