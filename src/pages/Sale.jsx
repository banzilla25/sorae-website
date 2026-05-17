import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Tag } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import ProductQuickView from '../components/product/ProductQuickView';

// For demo: show all products with a "Sale" context + special banner
export default function Sale() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Simulate sale products (bundle deals)
  const saleProducts = products.map(p => ({
    ...p,
    badge: 'Sale',
    originalPrice: p.price + 30000,
  }));

  return (
    <div className="min-h-screen pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-400 font-medium">
          <Link to="/" className="hover:text-[#0A0F2C] transition">Home</Link>
          <ChevronRight size={14} />
          <span className="text-[#2563EB] font-bold">Sale</span>
        </nav>
      </div>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden bg-[#0A0F2C] text-white py-16 px-10 text-center"
        >
          <div className="absolute inset-0">
            <img src="/sorae_hero_main.jpg" alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F2C] via-[#0A0F2C]/90 to-blue-900/80" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-red-500 text-white text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              <Tag size={12} />
              Sale Spesial
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              Hemat hingga <span className="text-yellow-400">25%</span>
            </h1>
            <p className="text-blue-200/80 text-lg font-medium mb-8 max-w-md mx-auto">
              Dapatkan parfum premium SORAE dengan harga spesial. Penawaran terbatas, jangan sampai ketinggalan!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-[#0A0F2C] px-8 py-4 rounded-2xl font-extrabold text-sm hover:bg-gray-100 transition"
            >
              Belanja Sekarang
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Sale Countdown (Static Display) */}
      <section className="max-w-7xl mx-auto px-6 mb-10">
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-red-500 mb-1">⏳ Penawaran Terbatas</p>
            <h3 className="font-extrabold text-[#0A0F2C] text-lg">Promo berlaku untuk pembelian pertama!</h3>
          </div>
          <div className="flex items-center gap-3">
            {['02', '18', '45'].map((val, i) => (
              <div key={i} className="text-center">
                <div className="bg-[#0A0F2C] text-white font-extrabold text-2xl w-14 h-14 rounded-xl flex items-center justify-center">{val}</div>
                <p className="text-[10px] font-bold uppercase text-gray-400 mt-1">{['Jam', 'Mnt', 'Dtk'][i]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sale Products Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold text-[#0A0F2C]">Produk Sale</h2>
          <span className="text-sm font-medium text-gray-400">{saleProducts.length} produk</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </section>

      {quickViewProduct && (
        <ProductQuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
}
