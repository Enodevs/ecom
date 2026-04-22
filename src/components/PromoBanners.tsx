import { Truck, RotateCcw, Headphones, BadgePercent } from 'lucide-react';

const PROMOS = [
  { Icon: Truck,        title: 'Free Shipping',  sub: 'On orders over $30',  from: 'from-blue-500',   to: 'to-cyan-500',    img: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=300&q=80' },
  { Icon: BadgePercent, title: '10% Cashback',   sub: 'On your first order', from: 'from-emerald-500',to: 'to-green-400',   img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&q=80' },
  { Icon: RotateCcw,    title: 'Easy Returns',   sub: '30-day guarantee',    from: 'from-amber-500',  to: 'to-orange-400',  img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80' },
  { Icon: Headphones,   title: '24/7 Support',   sub: 'Always here for you', from: 'from-violet-500', to: 'to-purple-400',  img: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=300&q=80' },
];

export default function PromoBanners() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {PROMOS.map(({ Icon, title, sub, from, to, img }, i) => (
        <div
          key={i}
          className="paper-card-sm relative overflow-hidden cursor-pointer group"
        >
          {/* Background image */}
          <img
            src={img}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
          />
          {/* Gradient */}
          <div className={`absolute inset-0 bg-linear-to-br ${from} ${to} opacity-90`} />
          {/* Content */}
          <div className="relative z-10 p-4 flex items-center gap-3 text-white">
            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center shrink-0 border border-white/30">
              <Icon size={18} />
            </div>
            <div>
              <p className="font-black text-sm leading-tight">{title}</p>
              <p className="text-white/80 text-xs">{sub}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
