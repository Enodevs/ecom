import { Heart, ShoppingCart, MapPin, Star, Eye } from 'lucide-react';
import { type Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';
import clsx from 'clsx';

const BADGE: Record<string, { label: string; cls: string }> = {
  flash:    { label: 'Flash',    cls: 'bg-yellow-400 text-gray-900 border-yellow-500' },
  deal:     { label: 'Deal',     cls: 'bg-red-500 text-white border-red-600'          },
  trending: { label: 'Hot',      cls: 'bg-orange-500 text-white border-orange-600'    },
  new:      { label: 'New',      cls: 'bg-green-500 text-white border-green-600'      },
};

interface Props {
  product: Product;
  onQuickView?: (p: Product) => void;
}

export default function ProductCard({ product, onQuickView }: Props) {
  const { add, openCart } = useCart();
  const { toggle, has } = useWishlist();
  const wished = has(product.id);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    add(product);
    toast.success(`Added to cart`, {
      icon: undefined,
      style: { fontWeight: 700, fontSize: '13px', borderRadius: '12px', border: '2px solid #1a1a2e' },
      duration: 1800,
    });
    setTimeout(openCart, 400);
  };

  const handleWish = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggle(product.id);
    if (!wished) toast.success('Saved to wishlist', { style: { fontWeight: 700, fontSize: '13px', borderRadius: '12px', border: '2px solid #1a1a2e' }, duration: 1500 });
  };

  return (
    <article
      className="paper-card group cursor-pointer overflow-hidden"
      onClick={() => onQuickView?.(product)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 border-b-2 border-[#1a1a2e]">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
        />

        {/* Top-left badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badge && (
            <span className={clsx('text-[10px] font-black px-2 py-0.5 rounded-full border', BADGE[product.badge].cls)}>
              {BADGE[product.badge].label}
            </span>
          )}
          {discount > 0 && (
            <span className="text-[10px] font-black bg-red-500 text-white px-2 py-0.5 rounded-full border border-red-600">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWish}
          className={clsx(
            'absolute top-2 right-2 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200 shadow-[1px_1px_0_#1a1a2e]',
            wished
              ? 'bg-red-500 text-white border-red-600 scale-110'
              : 'bg-white text-gray-400 border-[#1a1a2e] hover:text-red-500'
          )}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={12} fill={wished ? 'currentColor' : 'none'} />
        </button>

        {/* Quick view — slides up on hover (desktop), always visible on touch */}
        <div className="absolute bottom-0 left-0 right-0 flex
          translate-y-full group-hover:translate-y-0
          [@media(hover:none)]:translate-y-0
          transition-transform duration-200">
          <button
            onClick={(e) => { e.stopPropagation(); onQuickView?.(product); }}
            className="flex-1 bg-white/95 backdrop-blur-sm border-t-2 border-r border-[#1a1a2e] py-2 text-[10px] sm:text-xs font-black flex items-center justify-center gap-1 sm:gap-1.5 hover:bg-gray-50 transition-colors"
          >
            <Eye size={11} /> <span className="hidden sm:inline">Quick View</span><span className="sm:hidden">View</span>
          </button>
          <button
            onClick={handleAdd}
            className="flex-1 bg-[#6c47ff] border-t-2 border-[#1a1a2e] py-2 text-[10px] sm:text-xs font-black text-white flex items-center justify-center gap-1 sm:gap-1.5 hover:bg-[#5a38e0] transition-colors"
          >
            <ShoppingCart size={11} /> Add
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-2.5 sm:p-3">
        <p className="text-[9px] sm:text-[10px] text-gray-400 font-semibold uppercase tracking-wide mb-0.5 truncate">{product.seller}</p>
        <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug mb-1 sm:mb-1.5 line-clamp-2">{product.title}</h3>

        {/* Stars */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-1.5 sm:mb-2">
            <div className="flex">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} size={9} className={i <= Math.round(product.rating!) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />
              ))}
            </div>
            <span className="text-[9px] sm:text-[10px] text-gray-400 hidden sm:inline">({product.reviews?.toLocaleString()})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-baseline gap-1 min-w-0">
            <span className="text-sm sm:text-base font-black text-[#6c47ff] shrink-0">${product.price}</span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-gray-400 line-through hidden sm:inline">${product.originalPrice}</span>
            )}
          </div>
          <span className="flex items-center gap-0.5 text-[9px] sm:text-[10px] text-gray-400 shrink-0">
            <MapPin size={8} />{product.distance}mi
          </span>
        </div>

        {/* Stock bar */}
        {product.stock && product.stock < 15 && (
          <div className="mt-1.5 sm:mt-2">
            <div className="h-1 sm:h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
              <div
                className="h-full bg-linear-to-r from-orange-400 to-red-500 rounded-full"
                style={{ width: `${(product.stock / 20) * 100}%` }}
              />
            </div>
            <p className="text-[9px] sm:text-[10px] text-orange-500 font-bold mt-0.5">Only {product.stock} left!</p>
          </div>
        )}
      </div>
    </article>
  );
}
