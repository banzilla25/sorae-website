import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Minus, Plus, ChevronRight, ExternalLink } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRICE_SIZES, ORIGINAL_PRICE_SIZES } from '../../data/products';

export default function ProductQuickView({ product, onClose }) {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[1] || '50ml');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!product) return null;

  const price = PRICE_SIZES?.[selectedSize] ?? product.price;
  const originalPrice = ORIGINAL_PRICE_SIZES?.[selectedSize] ?? product.originalPrice;
  const images = product.images?.length > 0 ? product.images.slice(0, 6) : [product.image];

  const handleAdd = () => {
    addToCart(product, selectedSize, quantity);
    onClose();
    setIsCartOpen(true);
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Side Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 flex-shrink-0">
              <span className="text-xs font-extrabold uppercase tracking-widest text-gray-400">Quick View</span>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition">
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              {/* Product Image Slider */}
              <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden group">
                <img src={images[currentSlide]} alt={product.name} className="w-full h-full object-cover transition-opacity duration-300" />
                
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight size={16} className="rotate-180" />
                    </button>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight size={16} />
                    </button>
                    
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                      {images.map((_, idx) => (
                        <div key={idx} className={`w-1.5 h-1.5 rounded-full ${currentSlide === idx ? 'bg-[#0A0F2C]' : 'bg-white/70 shadow-sm'}`} />
                      ))}
                    </div>
                  </>
                )}

                {product.badge && (
                  <span className={`absolute top-4 left-4 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full ${
                    product.badge === 'Best Seller' ? 'bg-[#0A0F2C] text-white' : 'bg-[#2563EB] text-white'
                  }`}>
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="p-6 space-y-6">
                {/* Name & Category */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#2563EB] mb-1">{product.category}</p>
                  <h2 className="text-2xl font-extrabold text-[#0A0F2C] leading-tight mb-1">{product.name}</h2>
                  <p className="text-gray-400 font-medium text-sm">{product.subtitle}</p>
                </div>

                {/* Story / Description */}
                <div>
                  <p className="text-base font-semibold text-gray-700 italic mb-2">"{product.story}"</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{product.desc}</p>
                </div>

                {/* Scent Notes */}
                <div className="bg-[#F4F7FB] rounded-2xl p-4 space-y-2">
                  <p className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400 mb-3">Scent Notes</p>
                  {Object.entries(product.notes).map(([key, value]) => (
                    <div key={key} className="flex gap-3 text-sm">
                      <span className="font-bold text-[#0A0F2C] capitalize w-12 flex-shrink-0">{key}:</span>
                      <span className="text-gray-600 font-medium">{value}</span>
                    </div>
                  ))}
                </div>

                {/* BPOM */}
                {product.bpom && (
                  <p className="text-xs text-gray-400 font-medium">No BPOM: <span className="font-bold text-gray-600">{product.bpom}</span></p>
                )}

                {/* Size Selector */}
                <div>
                  <p className="text-sm font-bold text-[#0A0F2C] mb-3">Ukuran: <span className="text-[#2563EB]">{selectedSize}</span></p>
                  <div className="flex gap-2">
                    {product.sizes?.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-bold border-2 transition ${
                          selectedSize === size
                            ? 'bg-[#0A0F2C] border-[#0A0F2C] text-white'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-[#0A0F2C]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <p className="text-sm font-bold text-[#0A0F2C] mb-3">Jumlah</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-[#0A0F2C] transition"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-extrabold text-lg text-[#0A0F2C]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-[#0A0F2C] transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between py-4 border-t border-gray-100 mt-4">
                  <span className="text-sm font-bold text-gray-500">Total</span>
                  <div className="flex flex-col items-end">
                    {originalPrice && originalPrice > price && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-400 line-through font-medium">
                          Rp {(originalPrice * quantity).toLocaleString('id-ID')}
                        </span>
                        <span className="bg-red-50 text-red-600 px-1.5 py-0.5 text-[10px] rounded-md font-extrabold">
                          {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
                        </span>
                      </div>
                    )}
                    <span className={`text-2xl font-extrabold ${originalPrice && originalPrice > price ? 'text-red-600' : 'text-[#0A0F2C]'}`}>
                      Rp {(price * quantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* View Full Details */}
                <Link
                  to={`/products/${product.id}`}
                  onClick={onClose}
                  className="flex items-center justify-between text-sm font-bold text-gray-500 hover:text-[#0A0F2C] transition py-2 border-t border-gray-100"
                >
                  <span>Lihat Detail Lengkap</span>
                  <ChevronRight size={16} />
                </Link>

                {/* Marketplace Links */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Atau beli di marketplace</p>
                  <div className="flex gap-2">
                    <a href={product.links?.shopee} target="_blank" rel="noopener noreferrer"
                      className="flex-1 bg-white border border-gray-100 shadow-sm hover:border-orange-200 py-2.5 rounded-xl flex items-center justify-center transition group">
                      <img src="/assets/Logo-Shopee.png" alt="Shopee" className="h-5 object-contain group-hover:scale-110 transition-transform" />
                    </a>
                    <a href={product.links?.tokopedia} target="_blank" rel="noopener noreferrer"
                      className="flex-1 bg-white border border-gray-100 shadow-sm hover:border-green-200 py-2.5 rounded-xl flex items-center justify-center transition group">
                      <img src="/assets/Logo-tokopedia.png" alt="Tokopedia" className="h-5 object-contain group-hover:scale-110 transition-transform" />
                    </a>
                    <a href={product.links?.tiktok} target="_blank" rel="noopener noreferrer"
                      className="flex-1 bg-white border border-gray-100 shadow-sm hover:border-black/20 py-2.5 rounded-xl flex items-center justify-center transition group">
                      <img src="/assets/Logo-tiktokshop.png" alt="TikTok Shop" className="h-5 object-contain group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons - Fixed Bottom */}
            <div className="px-6 py-5 border-t border-gray-100 flex gap-3 flex-shrink-0 bg-white">
              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-extrabold text-sm transition ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'border-2 border-[#0A0F2C] text-[#0A0F2C] hover:bg-gray-50'
                }`}
              >
                <ShoppingBag size={17} />
                {added ? 'Ditambahkan! ✓' : 'Add to Cart'}
              </button>
              <Link
                to="/checkout"
                onClick={() => { handleAdd(); onClose(); }}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-extrabold text-sm bg-[#0A0F2C] text-white hover:bg-black transition"
              >
                Beli Sekarang
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
