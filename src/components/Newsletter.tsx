import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="paper-card relative overflow-hidden">
      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />
      <div className="absolute inset-0 bg-linear-to-br from-violet-50 to-purple-50" />

      <div className="relative z-10 p-4 sm:p-6 md:p-10 flex flex-col md:flex-row items-center gap-4 sm:gap-6">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-[#6c47ff] text-white text-xs font-black px-3 py-1 rounded-full mb-2 sm:mb-3 border-2 border-[#1a1a2e] shadow-[2px_2px_0_#1a1a2e]">
            <Mail size={11} /> Newsletter
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-1">Get the best deals first</h3>
          <p className="text-gray-500 text-xs sm:text-sm">Subscribe and get exclusive offers, flash sale alerts, and new arrivals straight to your inbox.</p>
        </div>

        <div className="w-full md:w-auto md:min-w-[320px] lg:min-w-[360px]">
          {submitted ? (
            <div className="flex items-center gap-3 bg-green-50 border-2 border-green-500 rounded-xl px-4 sm:px-5 py-3 sm:py-4 shadow-[3px_3px_0_#16a34a]">
              <CheckCircle size={18} className="text-green-600 shrink-0" />
              <div>
                <p className="font-black text-green-800 text-sm">You're in!</p>
                <p className="text-green-600 text-xs">Check your inbox for a welcome gift.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col xs:flex-row gap-2">
              <div className="flex-1 flex items-center bg-white border-2 border-[#1a1a2e] rounded-xl overflow-hidden shadow-[3px_3px_0_#1a1a2e] focus-within:shadow-[3px_3px_0_#6c47ff] focus-within:border-[#6c47ff] transition-all min-w-0">
                <Mail size={14} className="ml-3 text-gray-400 shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 px-2 sm:px-3 py-2.5 sm:py-3 text-sm outline-none bg-transparent text-gray-800 placeholder:text-gray-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="paper-btn bg-[#6c47ff] text-white font-black text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#5a38e0] transition-colors whitespace-nowrap shrink-0"
              >
                Subscribe <ArrowRight size={13} />
              </button>
            </form>
          )}
          <p className="text-[10px] sm:text-[11px] text-gray-400 mt-1.5 sm:mt-2 text-center md:text-left">No spam, unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
}
