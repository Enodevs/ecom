import useEmblaCarousel from 'embla-carousel-react';
import { useFlashProducts, useCountdown } from '../hooks/useProducts';
import ProductCard from './ProductCard';
import SkeletonCard from './SkeletonCard';
import { Zap } from 'lucide-react';
import { type Product } from '../data/products';

interface Props { onQuickView: (p: Product) => void; }

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-[#1a1a2e] text-white font-black text-sm sm:text-base md:text-xl w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-md sm:rounded-lg border-2 border-[#1a1a2e] flex items-center justify-center tabular-nums shadow-[2px_2px_0_#6c47ff]">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-[8px] sm:text-[9px] font-black text-gray-500 mt-0.5 sm:mt-1 uppercase tracking-wider">{label}</span>
    </div>
  );
}

export default function FlashSale({ onQuickView }: Props) {
  const { products, loading } = useFlashProducts();
  const { h, m, s } = useCountdown(4 * 3600 + 23 * 60 + 47);
  const [emblaRef] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });

  return (
    <section className="bg-white rounded-2xl border-2 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] p-3 sm:p-4 md:p-6">
      {/* Header — stacks on xs, row on sm+ */}
      <div className="flex flex-col xs:flex-row flex-wrap items-start sm:items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-5">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-400 rounded-lg p-1.5 border-2 border-[#1a1a2e] shadow-[2px_2px_0_#1a1a2e]">
            <Zap size={15} className="text-gray-900 fill-gray-900" />
          </div>
          <h2 className="text-base sm:text-lg font-black text-gray-900">Flash Sale</h2>
          <span className="text-[10px] sm:text-xs bg-red-500 text-white font-black px-2 py-0.5 rounded-full border border-red-600 animate-pulse">LIVE</span>
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-[10px] sm:text-xs text-gray-500 font-bold">Ends in</span>
          <div className="flex items-center gap-0.5 sm:gap-1">
            <TimeBlock value={h} label="HRS" />
            <span className="text-gray-400 font-black text-base sm:text-lg pb-3 sm:pb-4">:</span>
            <TimeBlock value={m} label="MIN" />
            <span className="text-gray-400 font-black text-base sm:text-lg pb-3 sm:pb-4">:</span>
            <TimeBlock value={s} label="SEC" />
          </div>
        </div>

        <button className="text-xs sm:text-sm font-black text-[#6c47ff] hover:underline">See all →</button>
      </div>

      <div ref={emblaRef} className="overflow-hidden -mx-1">
        <div className="flex gap-2 sm:gap-3 px-1">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="min-w-[140px] sm:min-w-[160px] md:min-w-[200px]"><SkeletonCard /></div>
              ))
            : products.map((p) => (
                <div key={p.id} className="min-w-[140px] sm:min-w-[160px] md:min-w-[200px]">
                  <ProductCard product={p} onQuickView={onQuickView} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
