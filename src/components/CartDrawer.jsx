import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ChevronRight, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  // Free shipping logic
  const FREE_SHIPPING_THRESHOLD = 150000;
  const progressPercentage = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - cartTotal;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-[#F4F7FB] z-[110] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-gray-100 flex-shrink-0">
              <h2 className="text-lg font-extrabold text-[#0A0F2C] flex items-center gap-2">
                <ShoppingBag size={20} />
                Keranjang Anda ({items.length})
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {items.length > 0 && (
              <div className="bg-white px-6 py-4 border-b border-gray-100 flex-shrink-0">
                <p className="text-xs font-bold text-gray-500 mb-2">
                  {cartTotal >= FREE_SHIPPING_THRESHOLD 
                    ? '🎉 Yay! Anda mendapatkan Gratis Ongkir!' 
                    : `Kurang Rp ${remainingForFreeShipping.toLocaleString('id-ID')} lagi untuk Gratis Ongkir!`}
                </p>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    className={`h-full rounded-full transition-all duration-500 ${
                      progressPercentage === 100 ? 'bg-green-500' : 'bg-[#2563EB]'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                  <ShoppingBag size={48} className="mb-4 opacity-20" />
                  <p className="font-medium text-lg">Keranjang masih kosong.</p>
                  <p className="text-sm mt-1">Belum menemukan wangi yang pas?</p>
                  <button 
                    onClick={() => { setIsCartOpen(false); navigate('/products'); }}
                    className="mt-6 px-6 py-3 bg-[#0A0F2C] text-white rounded-xl font-bold text-sm"
                  >
                    Mulai Belanja
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="font-bold text-[#0A0F2C] text-sm leading-tight">{item.product.name}</h3>
                          <p className="text-xs text-gray-400 mt-0.5">{item.size} · {item.product.category}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-100">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-white hover:shadow-sm font-bold"
                          >-</button>
                          <span className="text-xs font-bold text-[#0A0F2C] w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded text-gray-500 hover:bg-white hover:shadow-sm font-bold"
                          >+</button>
                        </div>
                        <span className="font-extrabold text-[#0A0F2C] text-sm">
                          Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="bg-white border-t border-gray-100 p-6 flex-shrink-0 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Subtotal</span>
                  <span className="text-xl font-extrabold text-[#0A0F2C]">Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>
                
                <p className="text-xs text-gray-400 text-center mb-4">
                  Ongkos kirim akan dihitung pada langkah selanjutnya.
                </p>

                <button 
                  onClick={handleCheckoutClick}
                  className="w-full bg-[#0A0F2C] text-white py-4 rounded-2xl font-extrabold text-sm tracking-wide shadow-lg hover:bg-black active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  Checkout Sekarang <ChevronRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
