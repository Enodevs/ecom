import { Home, Search, PlusCircle, ShoppingCart, User } from 'lucide-react';
import clsx from 'clsx';

const ITEMS = [
  { label: 'Home',    Icon: Home         },
  { label: 'Search',  Icon: Search       },
  { label: 'Sell',    Icon: PlusCircle   },
  { label: 'Cart',    Icon: ShoppingCart },
  { label: 'Profile', Icon: User         },
];

interface Props { active: string; onSelect: (l: string) => void; }

export default function BottomNav({ active, onSelect }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden">
      <div className="flex items-center justify-around max-w-lg mx-auto px-2 py-1">
        {ITEMS.map(({ label, Icon }) => {
          const isSell = label === 'Sell';
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => onSelect(label)}
              aria-current={isActive ? 'page' : undefined}
              className={clsx(
                'flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 relative',
                isSell
                  ? 'bg-[#6c47ff] text-white rounded-2xl px-4 py-2.5 -mt-4 shadow-lg shadow-violet-300 hover:bg-[#5a38e0] active:scale-95'
                  : isActive
                    ? 'text-[#6c47ff]'
                    : 'text-gray-400 hover:text-gray-600'
              )}
            >
              <Icon size={isSell ? 22 : 20} />
              <span className={clsx('text-[10px] font-semibold', isSell && 'text-white')}>{label}</span>
              {label === 'Cart' && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">3</span>
              )}
              {isActive && !isSell && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#6c47ff] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
