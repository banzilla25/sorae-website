import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Send, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to WhatsApp with prefilled message
    const text = encodeURIComponent(`Halo SORAE!\n\nNama: ${form.name}\nEmail: ${form.email}\nHP: ${form.phone}\n\n${form.message}`);
    window.open(`https://api.whatsapp.com/send?phone=6281399686164&text=${text}`, '_blank');
    setSent(true);
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-400 font-medium">
          <Link to="/" className="hover:text-[#0A0F2C] transition">Home</Link>
          <ChevronRight size={14} />
          <span className="text-[#0A0F2C] font-bold">Contact</span>
        </nav>
      </div>

      {/* Main Section */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
          {/* Left: Image + Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative bg-[#0A0F2C] p-10 flex flex-col justify-between min-h-[500px]"
          >
            <div className="absolute inset-0 overflow-hidden">
              <img src="/sorae_hero_main.jpg" alt="SORAE Contact" className="w-full h-full object-cover opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F2C]/90 to-blue-900/80" />
            </div>

            <div className="relative z-10">
              <p className="text-xs font-extrabold uppercase tracking-widest text-blue-400 mb-4">Hubungi Kami</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">Get in Touch</h1>
              <p className="text-blue-200/70 font-medium leading-relaxed">
                Punya pertanyaan tentang produk, pengiriman, atau penawaran khusus? Kami siap membantu kamu!
              </p>
            </div>

            <div className="relative z-10 space-y-5 mt-10">
              {[
                {
                  icon: <MessageCircle size={18} />,
                  label: 'WhatsApp',
                  value: '+62 813-9968-6164',
                  href: 'https://api.whatsapp.com/send?phone=6281399686164',
                },
                {
                  icon: <MapPin size={18} />,
                  label: 'Lokasi',
                  value: 'Indonesia 🇮🇩',
                  href: null,
                },
                {
                  icon: <Clock size={18} />,
                  label: 'Jam Kerja',
                  value: 'Senin–Jumat 09.00–17.00',
                  href: null,
                },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-300 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-400">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer"
                        className="text-white font-bold hover:text-blue-300 transition">{item.value}</a>
                    ) : (
                      <p className="text-white font-bold">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-10 flex flex-col justify-center"
          >
            {sent ? (
              <div className="text-center">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-extrabold text-[#0A0F2C] mb-3">Pesan Terkirim!</h2>
                <p className="text-gray-500 font-medium mb-6">WhatsApp kami sudah terbuka. Silakan kirim pesanmu di sana.</p>
                <button
                  onClick={() => setSent(false)}
                  className="text-blue-600 font-bold hover:underline text-sm"
                >
                  Kirim pesan lain
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-extrabold text-[#0A0F2C] mb-8">Kirim Pesan</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Nama</label>
                      <input
                        name="name"
                        type="text"
                        placeholder="Nama kamu"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-[#0A0F2C] placeholder-gray-300 outline-none focus:border-[#0A0F2C] focus:ring-2 focus:ring-[#0A0F2C]/10 transition"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Email *</label>
                      <input
                        name="email"
                        type="email"
                        placeholder="Email kamu"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-[#0A0F2C] placeholder-gray-300 outline-none focus:border-[#0A0F2C] focus:ring-2 focus:ring-[#0A0F2C]/10 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">No. HP / WhatsApp</label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="08xx-xxxx-xxxx"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-[#0A0F2C] placeholder-gray-300 outline-none focus:border-[#0A0F2C] focus:ring-2 focus:ring-[#0A0F2C]/10 transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Pesan kamu</label>
                    <textarea
                      name="message"
                      placeholder="Tulis pesanmu di sini..."
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-[#0A0F2C] placeholder-gray-300 outline-none focus:border-[#0A0F2C] focus:ring-2 focus:ring-[#0A0F2C]/10 transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0A0F2C] text-white py-4 rounded-2xl font-extrabold text-sm hover:bg-black transition flex items-center justify-center gap-2"
                  >
                    <Send size={16} />
                    Kirim via WhatsApp
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-[#0A0F2C] mb-2">Pertanyaan Umum</h2>
          <p className="text-gray-400 font-medium">Jawaban cepat untuk pertanyaan yang sering ditanyakan</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {[
            { q: 'Berapa lama pengiriman?', a: 'Pengiriman reguler 2–4 hari kerja ke seluruh Indonesia. Tersedia juga ekspres 1 hari.' },
            { q: 'Apakah produk SORAE terdaftar BPOM?', a: 'Ya! Semua produk SORAE sudah terdaftar dan tersertifikasi BPOM Indonesia.' },
            { q: 'Apakah bisa retur produk?', a: 'Bisa, dalam 7 hari jika produk rusak atau tidak sesuai. Hubungi kami via WhatsApp.' },
            { q: 'Metode pembayaran apa yang tersedia?', a: 'Transfer bank, GoPay, OVO, ShopeePay, QRIS, dan Shopee/Tokopedia.' },
          ].map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="font-extrabold text-[#0A0F2C] mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
