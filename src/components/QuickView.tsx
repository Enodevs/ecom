import { X, Star, MapPin, ShoppingCart, Heart, Share2, Minus, Plus, Tag } from 'lucide-react';
import { type Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useState } from 'react';
import toast from 'react-hot-toast';
import clsx from 'clsx';

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function QuickView({ product, onClose }: Props) {
  const { add, openCart } = useCart();
  const { toggle, has } = useWishlist();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const wished = has(product.id);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) add(product);
    toast.success(`${qty}× ${product.title} added to cart`, {
      icon: '🛒',
      style: { fontWeight: 700, fontSize: '13px' },
    });
    onClose();
    setTimeout(openCart, 300);
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 fade-in"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl border-2 border-[#1a1a2e] shadow-[6px_6px_0_#1a1a2e] w-full max-w-2xl pointer-events-auto slide-up overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            {/* Image */}
            <div className="relative sm:w-64 shrink-0 bg-gray-50 border-b-2 sm:border-b-0 sm:border-r-2 border-[#1a1a2e]">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-56 sm:h-full object-cover"
              />
              {discount > 0 && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full border-2 border-[#1a1a2e]">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Details */}
            <div className="flex-1 p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{product.seller}</p>
                  <h2 className="text-lg font-black text-gray-900 leading-tight mt-0.5">{product.title}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="shrink-0 w-8 h-8 rounded-full border-2 border-[#1a1a2e] flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} size={13} className={i <= Math.round(product.rating!) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviews?.toLocaleString()} reviews)</span>
                </div>
              )}

              {/* Tags */}
              {product.tags && (
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map((t) => (
                    <span key={t} className="flex items-center gap-1 text-[11px] font-semibold bg-violet-50 text-[#6c47ff] border border-violet-200 px-2 py-0.5 rounded-full">
                      <Tag size={9} />{t}
                    </span>
                  ))}
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#6c47ff]">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                )}
                {discount > 0 && (
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    Save ${product.originalPrice! - product.price}
                  </span>
                )}
              </div>

              {/* Distance */}
              <p className="flex items-center gap-1 text-xs text-gray-400">
                <MapPin size={12} className="text-[#6c47ff]" />
                {product.distance} miles away · {product.seller}
              </p>

              {/* Stock bar */}
              {product.stock && product.stock < 15 && (
                <div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                    <div
                      className="h-full bg-linear-to-r from-orange-400 to-red-500 rounded-full"
                      style={{ width: `${(product.stock / 20) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-orange-500 font-bold mt-1">Only {product.stock} left in stock!</p>
                </div>
              )}

              {/* Qty + actions */}
              <div className="flex items-center gap-3 mt-auto pt-2">
                <div className="flex items-center border-2 border-[#1a1a2e] rounded-xl overflow-hidden">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center font-black text-sm">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="paper-btn flex-1 bg-[#6c47ff] text-white font-black text-sm py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#5a38e0]"
                >
                  <ShoppingCart size={15} /> Add to Cart
                </button>

                <button
                  onClick={() => toggle(product.id)}
                  className={clsx(
                    'paper-btn w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
                    wished ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-400 hover:text-red-500'
                  )}
                >
                  <Heart size={16} fill={wished ? 'currentColor' : 'none'} />
                </button>

                <button className="paper-btn w-10 h-10 rounded-xl flex items-center justify-center bg-white text-gray-400 hover:text-[#6c47ff] transition-colors">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
