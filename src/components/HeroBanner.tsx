import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

const SLIDES = [
  {
    tag: 'Mega Sale',
    title: 'Up to 70% Off\nElectronics',
    sub: 'Limited time deals on top brands',
    cta: 'Shop Now',
    bg: 'bg-violet-600',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=900&q=85',
    tint: 'from-violet-900/80 via-violet-800/60 to-transparent',
  },
  {
    tag: 'New Season',
    title: 'Fresh Fashion\nFor Everyone',
    sub: 'Discover the latest trends this season',
    cta: 'Explore',
    bg: 'bg-rose-500',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&q=85',
    tint: 'from-rose-900/80 via-rose-800/60 to-transparent',
  },
  {
    tag: 'Free Delivery',
    title: 'Home & Living\nEssentials',
    sub: 'Free shipping on orders over $30',
    cta: 'Browse',
    bg: 'bg-amber-500',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=85',
    tint: 'from-amber-900/80 via-amber-800/60 to-transparent',
  },
  {
    tag: 'Get Active',
    title: 'Sports & Fitness\nGear Up',
    sub: 'Get 10% cashback on your first order',
    cta: 'Shop Sports',
    bg: 'bg-cyan-600',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&q=85',
    tint: 'from-cyan-900/80 via-cyan-800/60 to-transparent',
  },
];

export default function HeroBanner() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative rounded-2xl overflow-hidden border-2 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e]">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {SLIDES.map((s, i) => (
            <div key={i} className="min-w-full relative min-h-[200px] sm:min-h-[260px] md:min-h-[340px] lg:min-h-[400px]">
              <img src={s.image} alt={s.tag} className="absolute inset-0 w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-linear-to-r ${s.tint}`} />
              <div className="relative z-10 flex items-center h-full px-5 py-7 sm:px-8 sm:py-10 md:px-14 md:py-12 min-h-[200px] sm:min-h-[260px] md:min-h-[340px] lg:min-h-[400px]">
                <div className="text-white max-w-xs sm:max-w-sm md:max-w-md">
                  <span className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] sm:text-xs font-black px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full mb-2 sm:mb-3 uppercase tracking-widest">
                    {s.tag}
                  </span>
                  <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-2 sm:mb-3 whitespace-pre-line drop-shadow-lg">
                    {s.title}
                  </h2>
                  <p className="text-white/85 text-xs sm:text-sm md:text-base mb-4 sm:mb-6 drop-shadow line-clamp-2">{s.sub}</p>
                  <button className="paper-btn bg-white text-gray-900 font-black text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3 rounded-xl flex items-center gap-1.5 sm:gap-2 hover:bg-yellow-300 transition-colors">
                    {s.cta} <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next — hidden on xs, visible sm+ */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-9 md:h-9 bg-white border-2 border-[#1a1a2e] rounded-full items-center justify-center shadow-[2px_2px_0_#1a1a2e] hover:bg-gray-100 transition-colors z-10"
      >
        <ChevronLeft size={15} />
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-9 md:h-9 bg-white border-2 border-[#1a1a2e] rounded-full items-center justify-center shadow-[2px_2px_0_#1a1a2e] hover:bg-gray-100 transition-colors z-10"
      >
        <ChevronRight size={15} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={clsx(
              'h-2 rounded-full border border-white/60 transition-all duration-300',
              i === selected ? 'w-6 bg-white' : 'w-2 bg-white/40'
            )}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
