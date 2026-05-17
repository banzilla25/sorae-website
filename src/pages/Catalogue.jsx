import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Download, ArrowRight } from 'lucide-react';
import { products } from '../data/products';

const collections = [
  { name: 'Fresh Collection', desc: 'Angin segar untuk jiwa yang bebas', products: ['breeze-mist'], color: 'from-blue-100 to-sky-200', icon: '🌊' },
  { name: 'Golden Collection', desc: 'Kehangatan senja yang abadi', products: ['golden-hour'], color: 'from-amber-100 to-orange-200', icon: '🌅' },
  { name: 'Floral Collection', desc: 'Kelembutan bunga yang intim', products: ['baby-buddy'], color: 'from-pink-100 to-rose-200', icon: '🌸' },
  { name: 'Gourmand Collection', desc: 'Manis berani yang playful', products: ['cherry-bloom'], color: 'from-red-100 to-red-200', icon: '🍒' },
];

export default function Catalogue() {
  return (
    <div className="min-h-screen pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-400 font-medium">
          <Link to="/" className="hover:text-[#0A0F2C] transition">Home</Link>
          <ChevronRight size={14} />
          <span className="text-[#0A0F2C] font-bold">Catalogue</span>
        </nav>
      </div>

      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 py-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] mb-3">SORAE 2026</p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#0A0F2C] mb-4 tracking-tight">
            Product Catalogue
          </h1>
          <p className="text-gray-400 font-medium text-lg mb-8 max-w-lg mx-auto">
            Jelajahi seluruh koleksi parfum SORAE. Setiap botol menyimpan cerita yang menunggu untuk menjadi milikmu.
          </p>
          <button className="inline-flex items-center gap-2 border-2 border-[#0A0F2C] text-[#0A0F2C] px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#0A0F2C] hover:text-white transition">
            <Download size={15} />
            Download PDF Catalogue
          </button>
        </motion.div>
      </section>

      {/* Collections */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {collections.map((col, i) => {
            const colProducts = products.filter(p => col.products.includes(p.id));
            return (
              <motion.div
                key={col.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gradient-to-br ${col.color} rounded-3xl p-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center`}
              >
                {/* Info */}
                <div>
                  <span className="text-4xl block mb-3">{col.icon}</span>
                  <h2 className="text-3xl font-extrabold text-[#0A0F2C] mb-2">{col.name}</h2>
                  <p className="text-gray-600 font-medium mb-4">{col.desc}</p>
                  <div className="flex flex-wrap gap-3">
                    {colProducts.map(p => (
                      <div key={p.id} className="bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-3 shadow-sm">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-white">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-extrabold text-[#0A0F2C] text-sm">{p.name}</p>
                          <p className="text-xs text-gray-500 font-medium">Rp {p.price.toLocaleString('id-ID')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to={`/products?category=${colProducts[0]?.category}`}
                  className="inline-flex items-center gap-2 bg-[#0A0F2C] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-black transition self-start md:self-center flex-shrink-0"
                >
                  Shop Collection <ArrowRight size={15} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* All products grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-extrabold text-[#0A0F2C] mb-8">Semua Varian</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/products/${product.id}`}
                className="flex gap-6 bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition group"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#2563EB] mb-1">{product.category}</p>
                  <h3 className="font-extrabold text-[#0A0F2C] text-xl mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-400 font-medium mb-2">{product.subtitle}</p>
                  <p className="text-sm text-gray-500 italic line-clamp-2">"{product.story}"</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-extrabold text-[#0A0F2C]">Rp {product.price.toLocaleString('id-ID')}</span>
                    <span className="text-xs font-bold text-gray-400">{product.sizes?.join(' · ')}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-[#0A0F2C] text-white rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-900/40" />
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold mb-3">Siap menemukan wangimu?</h2>
            <p className="text-blue-200/70 font-medium mb-8">Pesan sekarang dan dapatkan gratis vial parfum eksklusif!</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-[#0A0F2C] px-8 py-4 rounded-2xl font-extrabold text-sm hover:bg-gray-100 transition"
            >
              Shop Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
