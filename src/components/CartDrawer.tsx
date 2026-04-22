import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import clsx from 'clsx';

export default function CartDrawer() {
  const { items, isOpen, closeCart, remove, updateQty, total, count } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={clsx(
          'fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      />

      {/* Drawer */}
      <aside
        className={clsx(
          'fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col transition-transform duration-300 ease-out',
          'border-l-2 border-[#1a1a2e] shadow-[-6px_0_0_#1a1a2e]',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b-2 border-[#1a1a2e]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#6c47ff]" />
            <h2 className="font-black text-lg text-gray-900">Your Cart</h2>
            {count > 0 && (
              <span className="bg-[#6c47ff] text-white text-xs font-bold px-2 py-0.5 rounded-full bounce-pop">
                {count}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-full border-2 border-[#1a1a2e] flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
              <div className="w-20 h-20 rounded-full bg-violet-50 border-2 border-[#1a1a2e] flex items-center justify-center">
                <ShoppingBag size={32} className="text-[#6c47ff]" />
              </div>
              <p className="font-bold text-gray-700">Your cart is empty</p>
              <p className="text-sm text-gray-400">Add some items to get started</p>
              <button
                onClick={closeCart}
                className="paper-btn bg-[#6c47ff] text-white font-bold text-sm px-5 py-2.5 rounded-xl"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="paper-card-sm flex gap-3 p-3 fade-in">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg border-2 border-[#1a1a2e] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 font-medium">{item.seller}</p>
                  <p className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">{item.title}</p>
                  <p className="text-sm font-black text-[#6c47ff] mt-0.5">${item.price}</p>
                </div>
                <div className="flex flex-col items-end justify-between shrink-0">
                  <button
                    onClick={() => remove(item.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="flex items-center gap-1 border-2 border-[#1a1a2e] rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="text-xs font-black w-5 text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={10} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t-2 border-[#1a1a2e] space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping</span>
              <span className="font-bold text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-black text-base border-t-2 border-dashed border-gray-200 pt-3">
              <span>Total</span>
              <span className="text-[#6c47ff]">${total.toFixed(2)}</span>
            </div>
            <button className="paper-btn w-full bg-[#6c47ff] text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#5a38e0]">
              Checkout <ArrowRight size={16} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
