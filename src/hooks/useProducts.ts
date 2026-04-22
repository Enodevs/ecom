import { useState, useEffect, useRef } from 'react';
import { ALL_PRODUCTS, FLASH_PRODUCTS, type Product } from '../data/products';

export function useProducts(query: string, category: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setProducts(
        ALL_PRODUCTS.filter((p) => {
          const q = p.title.toLowerCase().includes(query.toLowerCase());
          const c = !category || p.category === category;
          return q && c;
        })
      );
      setLoading(false);
    }, 500);
    return () => clearTimeout(t);
  }, [query, category]);

  return { products, loading };
}

export function useFlashProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => { setProducts(FLASH_PRODUCTS); setLoading(false); }, 400);
    return () => clearTimeout(t);
  }, []);
  return { products, loading };
}

export function useCountdown(initial: number) {
  const [secs, setSecs] = useState(initial);
  const prev = useRef(initial);

  useEffect(() => {
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const changed = secs !== prev.current;
  prev.current = secs;

  return {
    h: Math.floor(secs / 3600),
    m: Math.floor((secs % 3600) / 60),
    s: secs % 60,
    changed,
  };
}
