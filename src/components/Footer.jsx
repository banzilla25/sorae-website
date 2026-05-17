import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="bg-[#0A0F2C] text-white">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand Column */}
        <div className="lg:col-span-1">
          <img src="/logo-sorae.svg" alt="SORAE" className="h-8 w-auto brightness-0 invert mb-4" />
          <p className="text-sm text-blue-200/70 leading-relaxed mb-6 font-medium">
            Born in Indonesia, crafted for the world. Kami menciptakan parfum dengan bahan premium yang aman, tahan lama, dan punya cerita.
          </p>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/soraeperfume/" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm8.5 1.5h-8.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5A4.25 4.25 0 0020.5 16.25v-8.5A4.25 4.25 0 0016.25 3.5zM12 7.5A4.5 4.5 0 117.5 12 4.5 4.5 0 0112 7.5zm0 1.5a3 3 0 103 3 3 3 0 00-3-3zm4.5-3.25a.75.75 0 11-.75.75.75.75 0 01.75-.75z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@soraeperfume" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.29 6.29 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.01a8.16 8.16 0 004.77 1.52V7.1a4.85 4.85 0 01-1-.41z"/></svg>
            </a>
            <a href="https://api.whatsapp.com/send?phone=6281399686164" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>

        {/* Inquiries */}
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-widest mb-5 text-white/90">Informasi</h3>
          <ul className="space-y-3">
            {[
              { label: 'Return & Refund', to: '/terms-of-service' },
              { label: 'Pengiriman', to: '/contact' },
              { label: 'Syarat & Ketentuan', to: '/terms-of-service' },
              { label: 'FAQ', to: '/#faq' },
              { label: 'Kebijakan Privasi', to: '/privacy-policy' },
            ].map(item => (
              <li key={item.label}>
                <Link to={item.to} className="text-sm text-blue-200/60 hover:text-white transition font-medium">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-widest mb-5 text-white/90">Customer Care</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="https://api.whatsapp.com/send?phone=6281399686164&text=Halo%20kak%2C%0AAku%20ingin%20menanyakan%20perihal%20Parfum%20SORAE"
                target="_blank" rel="noopener noreferrer"
                className="text-sm text-blue-200/60 hover:text-white transition font-medium"
              >
                Chat via WhatsApp
              </a>
            </li>
            <li>
              <Link to="/contact" className="text-sm text-blue-200/60 hover:text-white transition font-medium">Hubungi Kami</Link>
            </li>
            <li>
              <a href="https://www.instagram.com/soraeperfume/" target="_blank" rel="noopener noreferrer"
                className="text-sm text-blue-200/60 hover:text-white transition font-medium">
                DM Instagram
              </a>
            </li>
          </ul>

          <div className="mt-8">
            <h3 className="text-sm font-extrabold uppercase tracking-widest mb-2 text-white/90">Jam Operasional</h3>
            <p className="text-sm text-blue-200/60 font-medium">Senin – Jumat: 09.00 – 17.00</p>
            <p className="text-sm text-blue-200/60 font-medium">Sabtu: 09.00 – 13.00</p>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-widest mb-2 text-white/90">Exclusive Offers</h3>
          <p className="text-sm text-blue-200/60 mb-5 font-medium leading-relaxed">
            Daftar sekarang dan dapatkan promo & info restock terbaru langsung di inbox kamu.
          </p>
          {subscribed ? (
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-2xl p-4 text-center">
              <p className="text-sm font-bold text-blue-300">✓ Terima kasih sudah berlangganan!</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email kamu..."
                required
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none focus:border-blue-400 focus:bg-white/15 transition"
              />
              <button
                type="submit"
                className="bg-[#2563EB] hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl transition font-bold flex-shrink-0"
              >
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-blue-200/40 font-medium">© 2026 SORAE Official. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-xs text-blue-200/40 hover:text-white transition font-medium">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-xs text-blue-200/40 hover:text-white transition font-medium">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
