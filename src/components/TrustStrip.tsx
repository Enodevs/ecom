import { Truck, RotateCcw, Headphones, ShieldCheck, BadgeCheck } from 'lucide-react';

const ITEMS = [
  { Icon: Truck,       title: 'Free Shipping',   sub: 'On orders over $30'    },
  { Icon: RotateCcw,   title: 'Easy Returns',    sub: '30-day policy'         },
  { Icon: Headphones,  title: '24/7 Support',    sub: 'Always here for you'   },
  { Icon: ShieldCheck, title: 'Secure Payment',  sub: '100% protected'        },
  { Icon: BadgeCheck,  title: 'Genuine Products',sub: '100% authentic'        },
];

export default function TrustStrip() {
  return (
    <div className="bg-white rounded-2xl border-2 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] p-3 sm:p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {ITEMS.map(({ Icon, title, sub }) => (
          <div key={title} className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-violet-50 rounded-lg sm:rounded-xl border-2 border-[#1a1a2e] flex items-center justify-center shrink-0 shadow-[2px_2px_0_#1a1a2e]">
              <Icon size={14} className="text-[#6c47ff]" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs font-black text-gray-800 leading-tight">{title}</p>
              <p className="text-[9px] sm:text-[11px] text-gray-400 truncate">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
