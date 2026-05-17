import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star, ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import ProductQuickView from '../components/product/ProductQuickView';

const categories = [
  { name: 'Fresh', desc: 'Angin & Laut', color: 'from-blue-100 to-sky-200', icon: '🌊' },
  { name: 'Oriental', desc: 'Hangat & Elegan', color: 'from-amber-100 to-orange-200', icon: '✨' },
  { name: 'Floral', desc: 'Bunga & Lembut', color: 'from-pink-100 to-rose-200', icon: '🌸' },
  { name: 'Gourmand', desc: 'Manis & Playful', color: 'from-red-100 to-red-200', icon: '🍒' },
];

const testimonials = [
  { name: 'Alya R.', city: 'Jakarta', text: 'Breeze Mist beneran bikin orang sering nanya, parfum apaan itu? Suka banget!', rating: 5 },
  { name: 'Rizki M.', city: 'Bandung', text: 'Golden Hour cocok banget buat kerja, tahan lama dari pagi sampai malam. Worth it!', rating: 5 },
  { name: 'Nita S.', city: 'Surabaya', text: 'Baby Buddy jadi andalan sehari-hari. Wanginya lembut tapi berkesan banget.', rating: 5 },
  { name: 'Dimas F.', city: 'Medan', text: 'Cherry Bloom buat pasangan saya, dia sukaaaa. Romantis dan playful.', rating: 5 },
];

export default function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center pt-28 pb-16 px-6 overflow-hidden bg-transparent">
        {/* Ambient blobs */}
        <div className="absolute top-[10%] left-[5%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-blue-300/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[5%] w-[30vw] h-[30vw] max-w-[450px] max-h-[450px] bg-purple-300/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-[40%] right-[20%] w-[20vw] h-[20vw] max-w-[300px] max-h-[300px] bg-yellow-200/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">

          {/* Left: Text */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 mb-8 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-600">Parfum Premium Indonesia</span>
            </motion.div>

            <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-bold text-[#0A0F2C] leading-[1.05] tracking-tight mb-6">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Setiap orang
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                punya wangi{' '}
                <span className="font-serif italic font-normal text-blue-600">khasnya.</span>
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Apa{' '}
                <span className="font-serif italic font-normal text-blue-600">wangimu?</span>
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-lg md:text-xl text-gray-500 mb-10 max-w-xl leading-relaxed font-medium"
            >
              4 Kepribadian. 4 Cerita. EDP 50ml premium mulai Rp 90.000 — kualitas murni tanpa kompromi.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <Link
                to="/products"
                className="bg-[#0A0F2C] text-white px-8 py-4 rounded-2xl font-extrabold tracking-wide hover:bg-black transition shadow-lg hover:-translate-y-0.5 hover:shadow-xl flex items-center gap-2 text-sm"
              >
                Lihat Koleksi <ArrowRight size={16} />
              </Link>
              <Link
                to="/products"
                className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-bold text-sm hover:border-[#0A0F2C] hover:text-[#0A0F2C] transition"
              >
                Temukan Wangimu
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-8 mt-12 pt-8 border-t border-gray-200"
            >
              <div>
                <div className="text-3xl font-extrabold text-[#0A0F2C]">+1K</div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">Pembeli Puas</div>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <div className="text-3xl font-extrabold text-[#0A0F2C]">4.8 ★</div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">Rating</div>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <div className="text-3xl font-extrabold text-[#0A0F2C]">50ml</div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">Real EDP</div>
              </div>
            </motion.div>
          </div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:flex items-center justify-end"
          >
            <div className="w-full max-w-[480px] aspect-[4/5] relative">
              <div className="absolute inset-0 bg-[#E0F2FE] rounded-t-full rounded-bl-full overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-700">
                <img src="/sorae_hero_main.jpg" alt="SORAE Parfum" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
              </div>

              {/* Floating review card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.0 }}
                className="absolute -bottom-6 -left-12 bg-[#0A0F2C] text-white p-5 rounded-3xl shadow-2xl flex items-center gap-5 transform -rotate-2 hover:rotate-0 transition-transform duration-300"
              >
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-400 border-2 border-[#0A0F2C] overflow-hidden">
                      <img src={`/assets/user${i}.png`} alt={`User ${i}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-[#0A0F2C] flex items-center justify-center text-[10px] font-bold">+1K</div>
                </div>
                <div>
                  <div className="text-lg font-extrabold flex items-center gap-1">4.8 <span className="text-yellow-400 text-sm">★★★★★</span></div>
                  <div className="text-xs text-blue-200 font-medium">Happy customers</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600 mb-3">Koleksi</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A0F2C] tracking-tight">Temukan karaktermu</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/products?category=${cat.name}`}
                  className={`block bg-gradient-to-br ${cat.color} rounded-3xl p-6 text-center hover:-translate-y-1 transition-transform duration-300 group`}
                >
                  <span className="text-4xl mb-3 block">{cat.icon}</span>
                  <h3 className="font-extrabold text-[#0A0F2C] text-lg">{cat.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 font-medium">{cat.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 mt-3 group-hover:text-[#0A0F2C] transition">
                    Lihat <ChevronRight size={12} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED PRODUCTS ═══ */}
      <section className="py-20 px-6 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4"
          >
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600 mb-2">Koleksi</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A0F2C] tracking-tight">Parfum Pilihan</h2>
            </div>
            <Link to="/products" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#0A0F2C] transition">
              Lihat Semua <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EDITORIAL BANNER ═══ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden aspect-[4/3] group cursor-pointer"
          >
            <img src="/sorae_hero_main.jpg" alt="SORAE Collection" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <p className="text-xs font-extrabold uppercase tracking-widest text-blue-300 mb-2">2 Scents, 1 Statement</p>
              <h3 className="text-3xl font-extrabold leading-tight mb-4">Bundle Promo<br />Hemat Lebih Banyak</h3>
              <Link to="/products" className="inline-flex items-center gap-2 bg-white text-[#0A0F2C] px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition">
                Shop Now <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Banner 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden aspect-[4/3] group cursor-pointer bg-[#0A0F2C]"
          >
            <img src="/assets/breeze-mist.jpg" alt="SORAE Fresh" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-[#0A0F2C]/80" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <p className="text-xs font-extrabold uppercase tracking-widest text-blue-300 mb-2">New Arrival</p>
              <h3 className="text-3xl font-extrabold leading-tight mb-4">Fresh Collection<br />Edisi Musim Ini</h3>
              <Link to="/products?category=Fresh" className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white hover:text-[#0A0F2C] transition">
                Explore <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ PROCESS / USP ═══ */}
      <section className="py-20 px-6 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600 mb-3">Kenapa SORAE?</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A0F2C] tracking-tight">Dibuat dengan standar dunia</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🌿', title: 'Bahan Premium', desc: 'Menggunakan Ambroxan, ISO E Super, dan bahan-bahan kelas parfumeur dunia.' },
              { icon: '✅', title: 'Terdaftar BPOM', desc: 'Semua produk SORAE telah tersertifikasi BPOM Indonesia. Aman digunakan setiap hari.' },
              { icon: '💧', title: 'Real EDP 50ml', desc: 'Bukan cologne atau body mist. Ini Eau de Parfum sejati dengan konsentrasi tinggi.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-extrabold text-[#0A0F2C] text-xl mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600 mb-3">Ulasan</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A0F2C] tracking-tight">Kata mereka</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#F8FAFC] rounded-3xl p-6 border border-gray-100"
              >
                <div className="flex text-yellow-400 mb-4">
                  {Array(t.rating).fill(0).map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                </div>
                <p className="text-gray-700 font-medium leading-relaxed mb-5 italic">"{t.text}"</p>
                <div>
                  <p className="font-extrabold text-[#0A0F2C] text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400 font-medium">{t.city}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA STRIP ═══ */}
      <section className="py-20 px-6 bg-[#0A0F2C] text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Sparkles className="mx-auto mb-6 text-blue-400" size={32} />
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Langit berubah setiap hari.</h2>
            <p className="text-blue-200/80 text-lg font-medium mb-10">Kenapa wangimu harus selalu sama?</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-[#0A0F2C] px-10 py-4 rounded-2xl font-extrabold text-sm hover:bg-gray-100 transition hover:-translate-y-0.5 hover:shadow-xl shadow-lg"
            >
              Temukan Wangimu <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </>
  );
}
