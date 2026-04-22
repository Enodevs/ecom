import { ArrowRight, Gift, Smartphone } from 'lucide-react';

export default function MidBanners() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {/* App promo */}
      <div className="paper-card relative overflow-hidden min-h-[140px] sm:min-h-[160px] group cursor-pointer">
        <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=80" alt="App deals" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-linear-to-r from-violet-900/90 via-violet-800/70 to-transparent" />
        <div className="relative z-10 p-4 sm:p-6 text-white h-full flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs bg-white/20 border border-white/30 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-black uppercase tracking-wide mb-2 sm:mb-3">
              <Smartphone size={10} /> Exclusive
            </span>
            <h3 className="text-lg sm:text-xl font-black mb-1">App-Only Deals</h3>
            <p className="text-white/80 text-xs sm:text-sm">Extra 15% off with code <strong className="text-yellow-300 bg-yellow-300/20 px-1 rounded">APP15</strong></p>
          </div>
          <button className="paper-btn mt-3 sm:mt-4 self-start bg-white text-gray-900 font-black text-xs sm:text-sm px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl flex items-center gap-1.5 sm:gap-2 hover:bg-yellow-300 transition-colors">
            Get the App <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Refer & earn */}
      <div className="paper-card relative overflow-hidden min-h-[140px] sm:min-h-[160px] group cursor-pointer">
        <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700&q=80" alt="Refer and earn" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-linear-to-r from-amber-900/90 via-amber-800/70 to-transparent" />
        <div className="relative z-10 p-4 sm:p-6 text-white h-full flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs bg-white/20 border border-white/30 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-black uppercase tracking-wide mb-2 sm:mb-3">
              <Gift size={10} /> Refer & Earn
            </span>
            <h3 className="text-lg sm:text-xl font-black mb-1">Invite Friends</h3>
            <p className="text-white/80 text-xs sm:text-sm">Earn <strong className="text-yellow-300">$10 credit</strong> for every friend you refer</p>
          </div>
          <button className="paper-btn mt-3 sm:mt-4 self-start bg-white text-gray-900 font-black text-xs sm:text-sm px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl flex items-center gap-1.5 sm:gap-2 hover:bg-yellow-300 transition-colors">
            Share Now <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
