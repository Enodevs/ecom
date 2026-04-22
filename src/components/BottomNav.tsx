import { Home, Search, PlusCircle, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
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
  const { count, openCart } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-[#1a1a2e] md:hidden">
      {/* Safe area padding for notched phones */}
      <div className="flex items-center justify-around px-1 pt-1 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {ITEMS.map(({ label, Icon }) => {
          const isSell = label === 'Sell';
          const isCart = label === 'Cart';
          const isActive = active === label;

          return (
            <button
              key={label}
              onClick={() => {
                if (isCart) { openCart(); return; }
                onSelect(label);
              }}
              aria-current={isActive ? 'page' : undefined}
              className={clsx(
                'flex flex-col items-center gap-0.5 py-1.5 px-2 sm:px-3 rounded-xl transition-all duration-200 relative min-w-[44px]',
                isSell
                  ? 'bg-[#6c47ff] text-white rounded-2xl px-3 sm:px-4 py-2 -mt-3 shadow-[0_4px_14px_rgba(108,71,255,0.5)] border-2 border-[#1a1a2e] hover:bg-[#5a38e0] active:scale-95'
                  : isActive
                    ? 'text-[#6c47ff]'
                    : 'text-gray-400 hover:text-gray-600'
              )}
            >
              <Icon size={isSell ? 20 : 19} />
              <span className={clsx('text-[9px] sm:text-[10px] font-bold leading-none', isSell && 'text-white')}>
                {label}
              </span>
              {/* Live cart badge */}
              {isCart && count > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-red-500 text-white text-[8px] font-black min-w-[14px] h-3.5 rounded-full flex items-center justify-center px-0.5 border border-white">
                  {count > 9 ? '9+' : count}
                </span>
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
