import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Minus, Plus, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { getProductById, products, PRICE_SIZES, ORIGINAL_PRICE_SIZES } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/product/ProductCard';
import ProductQuickView from '../components/product/ProductQuickView';

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[1] || '50ml');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [expandNotes, setExpandNotes] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-6">
        <p className="text-6xl mb-4">🫧</p>
        <h1 className="text-2xl font-extrabold text-[#0A0F2C] mb-2">Produk tidak ditemukan</h1>
        <Link to="/products" className="text-blue-600 font-bold hover:underline">← Kembali ke Products</Link>
      </div>
    );
  }

  const price = PRICE_SIZES?.[selectedSize] ?? product.price;
  const originalPrice = ORIGINAL_PRICE_SIZES?.[selectedSize] ?? product.originalPrice;
  const images = product.images?.length > 0 ? product.images.slice(0, 6) : [product.image];

  const related = products.filter(p => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    
    // Track Add To Cart
    window.trackEvent?.('AddToCart', {
      content_name: product.name,
      content_id: product.id,
      value: price * quantity,
      currency: 'IDR'
    });

    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    
    // Track Add To Cart (for Buy Now)
    window.trackEvent?.('AddToCart', {
      content_name: product.name,
      content_id: product.id,
      value: price * quantity,
      currency: 'IDR'
    });

    navigate('/checkout');
  };

  return (
    <>
      <div className="pt-24 min-h-screen">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400 font-medium">
            <Link to="/" className="hover:text-[#0A0F2C] transition">Home</Link>
            <ChevronRight size={14} />
            <Link to="/products" className="hover:text-[#0A0F2C] transition">Products</Link>
            <ChevronRight size={14} />
            <span className="text-[#0A0F2C] font-bold">{product.name}</span>
          </nav>
        </div>

        {/* Main Product Section */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: Image Slider */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="sticky top-28"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-square bg-gray-50 border border-gray-100 mb-4 group">
                <img
                  src={images[currentSlide]}
                  alt={`${product.name} - ${currentSlide + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight size={20} className="rotate-180" />
                    </button>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {product.badge && (
                  <span className={`absolute top-5 left-5 text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full ${
                    product.badge === 'Best Seller' ? 'bg-[#0A0F2C] text-white' : 'bg-[#2563EB] text-white'
                  }`}>
                    {product.badge}
                  </span>
                )}
              </div>
              
              {/* Thumbnail List */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                        currentSlide === idx ? 'border-[#0A0F2C] opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right: Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Name & Category */}
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] mb-2">{product.category}</p>
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#0A0F2C] leading-tight mb-2">{product.name}</h1>
                <p className="text-gray-400 font-medium">{product.subtitle}</p>
              </div>

              {/* Price */}
              <div className="flex flex-col gap-1">
                {originalPrice && originalPrice > price && (
                  <div className="flex items-center gap-2">
                    <span className="text-xl text-gray-400 line-through font-medium">
                      Rp {originalPrice.toLocaleString('id-ID')}
                    </span>
                    <span className="bg-red-50 text-red-600 px-2 py-1 text-xs rounded-md font-extrabold">
                      {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
                    </span>
                  </div>
                )}
                <span className={`text-3xl font-extrabold ${originalPrice && originalPrice > price ? 'text-red-600' : 'text-[#0A0F2C]'}`}>
                  Rp {price.toLocaleString('id-ID')}
                </span>
              </div>

              {/* Story */}
              <div className="border-l-4 border-blue-500 pl-5">
                <p className="text-lg font-semibold text-gray-700 italic">"{product.story}"</p>
              </div>

              <p className="text-gray-500 leading-relaxed font-medium">{product.desc}</p>

              {/* Scent Notes */}
              <div className="bg-[#F4F7FB] rounded-2xl p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400">Scent Notes</p>
                </div>
                {Object.entries(product.notes).map(([key, value]) => (
                  <div key={key} className="flex gap-3 text-sm">
                    <span className="font-extrabold text-[#0A0F2C] capitalize w-16 flex-shrink-0">{key}:</span>
                    <span className="text-gray-600 font-medium">{value}</span>
                  </div>
                ))}
              </div>

              {/* Unique Point */}
              <div className="flex items-start gap-3 p-4 border border-dashed border-blue-200 rounded-xl bg-blue-50/50">
                <Sparkles size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm font-medium text-gray-700">{product.uniquePoint}</p>
              </div>

              {/* Size Selector */}
              <div>
                <p className="text-sm font-extrabold text-[#0A0F2C] mb-3 uppercase tracking-wide">
                  Ukuran: <span className="text-[#2563EB] normal-case">{selectedSize}</span>
                </p>
                <div className="flex gap-3">
                  {product.sizes?.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-xl font-bold border-2 transition text-sm ${
                        selectedSize === size
                          ? 'bg-[#0A0F2C] border-[#0A0F2C] text-white'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-[#0A0F2C] hover:text-[#0A0F2C]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-sm font-extrabold text-[#0A0F2C] mb-3 uppercase tracking-wide">Jumlah</p>
                <div className="flex items-center gap-4 border-2 border-gray-200 rounded-xl w-fit px-4 py-2">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="hover:text-blue-600 transition">
                    <Minus size={18} />
                  </button>
                  <span className="font-extrabold text-xl text-[#0A0F2C] w-8 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="hover:text-blue-600 transition">
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-extrabold text-sm transition border-2 ${
                    added
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-[#0A0F2C] text-[#0A0F2C] hover:bg-gray-50'
                  }`}
                >
                  <ShoppingBag size={18} />
                  {added ? 'Ditambahkan! ✓' : 'Add to Cart'}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-4 rounded-2xl font-extrabold text-sm bg-[#0A0F2C] text-white hover:bg-black transition"
                >
                  Beli Sekarang
                </button>
              </div>

              {/* BPOM */}
              {product.bpom && (
                <p className="text-xs text-gray-400 font-medium pt-2 border-t border-gray-100">
                  No BPOM: <span className="font-bold text-gray-600">{product.bpom}</span>
                </p>
              )}

              {/* Marketplace Links */}
              <div className="pt-4 border-t border-gray-100">
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400 mb-4">Atau beli di marketplace</p>
                <div className="flex gap-3">
                  <a href={product.links?.shopee} target="_blank" rel="noopener noreferrer"
                    className="flex-1 bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 py-3 rounded-xl flex items-center justify-center transition group">
                    <img src="/assets/Logo-Shopee.png" alt="Shopee" className="h-6 object-contain group-hover:scale-110 transition-transform" />
                  </a>
                  <a href={product.links?.tokopedia} target="_blank" rel="noopener noreferrer"
                    className="flex-1 bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 py-3 rounded-xl flex items-center justify-center transition group">
                    <img src="/assets/Logo-tokopedia.png" alt="Tokopedia" className="h-6 object-contain group-hover:scale-110 transition-transform" />
                  </a>
                  <a href={product.links?.tiktok} target="_blank" rel="noopener noreferrer"
                    className="flex-1 bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-black/20 py-3 rounded-xl flex items-center justify-center transition group">
                    <img src="/assets/Logo-tiktokshop.png" alt="TikTok Shop" className="h-6 object-contain group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        <section className="py-16 px-6 bg-[#F8FAFC] mt-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-extrabold text-[#0A0F2C] mb-8">Produk Lainnya</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          </div>
        </section>
      </div>

      {quickViewProduct && (
        <ProductQuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </>
  );
}
