import { BRANDS } from '../data/products';

export default function BrandShowcase() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Top Brands</h2>
        <button className="text-sm font-semibold text-[#6c47ff] hover:underline">All brands</button>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {BRANDS.map((b) => (
          <button
            key={b.id}
            className={`${b.bg} rounded-2xl p-4 flex flex-col items-center gap-2 border border-gray-100 hover:border-[#6c47ff] hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 group`}
          >
            <img
              src={b.logo}
              alt={b.name}
              className="h-8 w-auto object-contain grayscale group-hover:grayscale-0 transition-all"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
                const span = document.createElement('span');
                span.className = 'text-2xl font-black text-gray-400';
                span.textContent = b.name[0];
                img.parentElement?.appendChild(span);
              }}
            />
            <div className="text-center">
              <p className="text-xs font-bold text-gray-700">{b.name}</p>
              <p className="text-[10px] text-[#6c47ff] font-semibold">{b.discount}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
