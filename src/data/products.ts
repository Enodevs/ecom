export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  distance: number;
  image: string;
  category: string;
  seller: string;
  rating?: number;
  reviews?: number;
  badge?: 'flash' | 'deal' | 'trending' | 'new';
  stock?: number;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  accent: string;   // tailwind bg colour
}

export interface Brand {
  id: number;
  name: string;
  logo: string;
  discount: string;
  bg: string;
}

export const CATEGORIES: Category[] = [
  { id: 'electronics', name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&q=80', accent: 'bg-violet-100' },
  { id: 'fashion',     name: 'Fashion',     image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&q=80', accent: 'bg-pink-100'   },
  { id: 'home',        name: 'Home',        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80',    accent: 'bg-amber-100'  },
  { id: 'beauty',      name: 'Beauty',      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&q=80', accent: 'bg-rose-100'   },
  { id: 'sports',      name: 'Sports',      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&q=80', accent: 'bg-cyan-100'   },
  { id: 'books',       name: 'Books',       image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80', accent: 'bg-green-100'  },
  { id: 'toys',        name: 'Toys',        image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300&q=80',    accent: 'bg-orange-100' },
  { id: 'grocery',     name: 'Grocery',     image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&q=80',    accent: 'bg-lime-100'   },
];

export const BRANDS: Brand[] = [
  { id: 1, name: 'Samsung', logo: 'https://logo.clearbit.com/samsung.com', discount: 'Up to 40% off', bg: 'bg-blue-50'    },
  { id: 2, name: 'Nike',    logo: 'https://logo.clearbit.com/nike.com',    discount: 'Up to 35% off', bg: 'bg-gray-50'    },
  { id: 3, name: 'Apple',   logo: 'https://logo.clearbit.com/apple.com',   discount: 'Up to 25% off', bg: 'bg-slate-50'   },
  { id: 4, name: 'Adidas',  logo: 'https://logo.clearbit.com/adidas.com',  discount: 'Up to 30% off', bg: 'bg-zinc-50'    },
  { id: 5, name: 'Sony',    logo: 'https://logo.clearbit.com/sony.com',    discount: 'Up to 20% off', bg: 'bg-neutral-50' },
  { id: 6, name: 'LG',      logo: 'https://logo.clearbit.com/lg.com',      discount: 'Up to 45% off', bg: 'bg-red-50'     },
];

export const FLASH_PRODUCTS: Product[] = [
  { id: 101, title: 'Wireless Earbuds Pro',  price: 39,  originalPrice: 89,  distance: 0.5, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80', category: 'electronics', seller: 'TechStore',  rating: 4.5, reviews: 234, badge: 'flash', stock: 12 },
  { id: 102, title: 'Smart Watch Series 7',  price: 149, originalPrice: 299, distance: 0.8, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&q=80', category: 'electronics', seller: 'GadgetHub',  rating: 4.8, reviews: 567, badge: 'flash', stock: 8  },
  { id: 103, title: 'Portable BT Speaker',   price: 29,  originalPrice: 69,  distance: 1.2, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80', category: 'electronics', seller: 'AudioMax',   rating: 4.3, reviews: 189, badge: 'flash', stock: 15 },
  { id: 104, title: 'HD Webcam 1080p',       price: 45,  originalPrice: 99,  distance: 1.5, image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&q=80', category: 'electronics', seller: 'TechZone',   rating: 4.6, reviews: 312, badge: 'flash', stock: 6  },
  { id: 105, title: 'Mechanical Keyboard',   price: 59,  originalPrice: 129, distance: 2.0, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&q=80', category: 'electronics', seller: 'KeyMaster',  rating: 4.7, reviews: 445, badge: 'flash', stock: 10 },
  { id: 106, title: 'USB-C Hub 7-in-1',      price: 25,  originalPrice: 55,  distance: 1.8, image: 'https://images.unsplash.com/photo-1625895197185-efcec01cffe0?w=400&q=80', category: 'electronics', seller: 'HubWorld',   rating: 4.4, reviews: 198, badge: 'flash', stock: 20 },
];

export const ALL_PRODUCTS: Product[] = [
  { id: 1,  title: 'iPhone 14 Pro 256GB',        price: 649, originalPrice: 899,  distance: 0.3, image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&q=80', category: 'electronics', seller: 'iStore',     rating: 4.9, reviews: 1234, badge: 'deal',     tags: ['Apple','Smartphone'] },
  { id: 2,  title: 'Vintage Leather Sofa',        price: 320, originalPrice: 450,  distance: 0.8, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', category: 'home',        seller: 'HomeDecor',  rating: 4.7, reviews: 89,                      tags: ['Furniture','Living'] },
  { id: 3,  title: 'Nike Air Max 270',            price: 85,  originalPrice: 120,  distance: 1.2, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', category: 'fashion',     seller: 'SneakerHub', rating: 4.8, reviews: 456,  badge: 'trending', tags: ['Nike','Shoes'] },
  { id: 4,  title: 'MacBook Air M2',              price: 899, originalPrice: 1199, distance: 1.5, image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&q=80', category: 'electronics', seller: 'AppleZone',  rating: 5.0, reviews: 789,  badge: 'deal',     tags: ['Apple','Laptop'] },
  { id: 5,  title: 'Trek Mountain Bike',          price: 430, originalPrice: 599,  distance: 2.1, image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80', category: 'sports',      seller: 'BikeWorld',  rating: 4.6, reviews: 234,                     tags: ['Cycling','Outdoor'] },
  { id: 6,  title: 'Wooden Dining Table',         price: 210, originalPrice: 350,  distance: 2.4, image: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=400&q=80', category: 'home',        seller: 'FurniCo',    rating: 4.5, reviews: 123,                     tags: ['Furniture','Dining'] },
  { id: 7,  title: 'Sony WH-1000XM5',            price: 199, originalPrice: 349,  distance: 2.9, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80', category: 'electronics', seller: 'AudioPro',   rating: 4.9, reviews: 678,  badge: 'trending', tags: ['Sony','Headphones'] },
  { id: 8,  title: 'Design of Everyday Things',  price: 12,  originalPrice: 25,   distance: 3.3, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80', category: 'books',       seller: 'BookNook',   rating: 4.8, reviews: 345,                     tags: ['Design','Non-fiction'] },
  { id: 9,  title: 'Gaming Keyboard RGB',         price: 79,  originalPrice: 129,  distance: 1.8, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&q=80', category: 'electronics', seller: 'GameGear',   rating: 4.7, reviews: 567,  badge: 'new',      tags: ['Gaming','Keyboard'] },
  { id: 10, title: 'Premium Yoga Mat',            price: 35,  originalPrice: 60,   distance: 2.2, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80', category: 'sports',      seller: 'FitLife',    rating: 4.6, reviews: 234,                     tags: ['Yoga','Fitness'] },
  { id: 11, title: 'Adidas Ultraboost 22',        price: 110, originalPrice: 180,  distance: 1.0, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80', category: 'fashion',     seller: 'SportShop',  rating: 4.8, reviews: 890,  badge: 'trending', tags: ['Adidas','Shoes'] },
  { id: 12, title: 'Instant Pot Duo 7-in-1',     price: 79,  originalPrice: 129,  distance: 3.0, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80', category: 'home',        seller: 'KitchenPro', rating: 4.7, reviews: 1100, badge: 'deal',     tags: ['Kitchen','Cooking'] },
  { id: 13, title: 'Levi\'s 501 Original Jeans', price: 59,  originalPrice: 89,   distance: 1.4, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80', category: 'fashion',     seller: 'DenimCo',    rating: 4.5, reviews: 678,                     tags: ['Levis','Denim'] },
  { id: 14, title: 'Dyson V15 Vacuum',            price: 499, originalPrice: 699,  distance: 2.7, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', category: 'home',        seller: 'CleanHome',  rating: 4.9, reviews: 445,  badge: 'deal',     tags: ['Dyson','Cleaning'] },
];
