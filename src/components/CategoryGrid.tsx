import { CATEGORIES } from '../data/products';
import clsx from 'clsx';

interface Props { active: string; onChange: (id: string) => void; }

export default function CategoryGrid({ active, onChange }: Props) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-black text-gray-900">Shop by Category</h2>
        <button className="text-sm font-bold text-[#6c47ff] hover:underline">View all</button>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onChange(active === cat.id ? '' : cat.id)}
            aria-pressed={active === cat.id}
            className={clsx(
              'flex flex-col items-center gap-2 rounded-2xl border-2 overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95',
              active === cat.id
                ? 'border-[#6c47ff] shadow-[3px_3px_0_#6c47ff]'
                : 'border-[#1a1a2e] shadow-[3px_3px_0_#1a1a2e] hover:shadow-[4px_4px_0_#1a1a2e]'
            )}
          >
            {/* Photo */}
            <div className="relative w-full aspect-square overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className={clsx(
                'absolute inset-0 transition-opacity',
                active === cat.id ? 'bg-[#6c47ff]/30' : 'bg-black/10'
              )} />
            </div>
            {/* Label */}
            <span className={clsx(
              'text-[10px] font-black pb-2 px-1 text-center leading-tight',
              active === cat.id ? 'text-[#6c47ff]' : 'text-gray-700'
            )}>
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
