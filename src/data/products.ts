
export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  description: string;
  sizes: string[];
  colors: {
    name: string;
    value: string;
  }[];
  details: string[];
}

export const products: Product[] = [
  {
    id: "urban-fleece-hoodie",
    name: "vulgar tee 01",
    price: 89.99,
    images: [
      "/assets/009.png",
      "/assets/010.png"
      
    ],
    category: "t-shirts",
    description: "Minimalist essential t-shirt made from premium cotton with a clean design and perfect fit.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "White", value: "#ffffff" },
      { name: "Grey", value: "#888888" },
    ],
    details: [
      "100% premium cotton",
      "220 GSM fabric weight",
      "Regular fit",
      "Ribbed crew neck",
      "Pre-shrunk",
      "Silicone washed for softness"
    ]
  },
  {
    id: "essential-tee",
    name: "vulgar tee 02",
    price: 39.99,
    images: [
      "/assets/image2.png",
      "/assets/image4.png"
    ],
    category: "t-shirts",
    description: "Minimalist essential t-shirt made from premium cotton with a clean design and perfect fit.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "White", value: "#ffffff" },
      { name: "Grey", value: "#888888" },
    ],
    details: [
      "100% premium cotton",
      "220 GSM fabric weight",
      "Regular fit",
      "Ribbed crew neck",
      "Pre-shrunk",
      "Silicone washed for softness"
    ]
  },
  {
    id: "cargo-pants",
    name: "vulgar tee 03",
    price: 119.99,
    images: [
      "/assets/007.png",
      "/assets/008.png"
    ],
    category: "t-shirts",
    description: "Minimalist essential t-shirt made from premium cotton with a clean design and perfect fit.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "White", value: "#ffffff" },
      { name: "Grey", value: "#888888" },
    ],
    details: [
      "100% premium cotton",
      "220 GSM fabric weight",
      "Regular fit",
      "Ribbed crew neck",
      "Pre-shrunk",
      "Silicone washed for softness"
    ]
  },
  {
    id: "urban-crossbody-bag",
    name: "vulgar tee 04",
    price: 69.99,
    images: [
      "/assets/003.png",
       "/assets/004.png"
    ],
    category: "t-shirts",
    description: "Minimalist essential t-shirt made from premium cotton with a clean design and perfect fit.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "White", value: "#ffffff" },
      { name: "Grey", value: "#888888" },
    ],
    details: [
      "100% premium cotton",
      "220 GSM fabric weight",
      "Regular fit",
      "Ribbed crew neck",
      "Pre-shrunk",
      "Silicone washed for softness"
    ]
  },
  {
    id: "oversized-graphic-tee",
    name: "vulgar tee 05",
    price: 44.99,
    images: [
      "/assets/001.png",
      "/assets/002.png"
    ],
    category: "t-shirts",
    description: "Minimalist essential t-shirt made from premium cotton with a clean design and perfect fit.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "White", value: "#ffffff" },
      { name: "Grey", value: "#888888" },
    ],
    details: [
      "100% premium cotton",
      "220 GSM fabric weight",
      "Regular fit",
      "Ribbed crew neck",
      "Pre-shrunk",
      "Silicone washed for softness"
    ]
  },
  {
    id: "tech-joggers",
    name: "vulgar tee 06",
    price: 99.99,
    images: [
      "/assets/005.png",
      "/assets/006.png"
    ],
    category: "t-shirts",
    description: "Minimalist essential t-shirt made from premium cotton with a clean design and perfect fit.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "White", value: "#ffffff" },
      { name: "Grey", value: "#888888" },
    ],
    details: [
      "100% premium cotton",
      "220 GSM fabric weight",
      "Regular fit",
      "Ribbed crew neck",
      "Pre-shrunk",
      "Silicone washed for softness"
    ]
  },
  {
    id: "minimal-cap",
    name: "vulgar hoodie",
    price: 134.99,
    images: [
      "/assets/011.png",
      "/assets/012.png"
    ],
    category: "hoodies",
    description: "Premium oversized hoodie made from heavyweight fleece with a relaxed fit and minimalist design for urban style.",
    sizes: ["One Size"],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "White", value: "#ffffff" },
      { name: "Beige", value: "#f5f5dc" },
    ],
    details: [
      "100% premium cotton fleece",
      "Oversized fit",
      "Heavyweight 450 GSM fabric",
      "Ribbed cuffs and hem",
      "Kangaroo pocket",
      "Drawstring hood"
    ]
  },
  {
    id: "bomber-jacket",
    name: "sleeveless tee",
    price: 159.99,
    images: [
      "/assets/013.png"
    ],
    category: "accessories",
    description: "Urban technical bomber jacket with water-resistant shell and minimal design for versatile city style.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Olive", value: "#556b2f" },
    ],
    details: [
      "Water-resistant technical shell",
      "YKK zipper hardware",
      "Ribbed cuffs and hem",
      "Multiple interior pockets",
      "Branded metal hardware",
      "Relaxed fit"
    ]
  }
];

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getProduct = (id: string) => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = () => {
  return products.slice(0, 4);
};
