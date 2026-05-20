import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product, onQuickView, index = 0 }) {
  const { addToCart, setIsCartOpen } = useCart();
  const [addedFeedback, setAddedFeedback] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes?.[1] || '50ml', 1);
    
    window.trackEvent?.('AddToCart', {
      content_name: product.name,
      content_id: product.id,
      value: product.price,
      currency: 'IDR'
    });

    setIsCartOpen(true);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <Link to={`/products/${product.id}`} className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[4/5] bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badge */}
          {product.badge && (
            <span className={`absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full z-10 ${
              product.badge === 'Best Seller' ? 'bg-[#0A0F2C] text-white' :
              product.badge === 'New Arrival' ? 'bg-[#2563EB] text-white' :
              product.badge === 'Sale' ? 'bg-red-500 text-white' :
              'bg-gray-800 text-white'
            }`}>
              {product.badge}
            </span>
          )}

          {!product.inStock && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-10">
              <span className="bg-gray-900 text-white text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full">Sold Out</span>
            </div>
          )}

          {/* Hover Overlay Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-end justify-center pb-4 gap-2 opacity-0 group-hover:opacity-100">
            {/* Quick View */}
            <button
              onClick={handleQuickView}
              className="flex items-center gap-1.5 bg-white text-[#0A0F2C] text-xs font-bold px-4 py-2 rounded-full shadow-lg hover:bg-gray-50 transition transform translate-y-2 group-hover:translate-y-0 duration-300"
            >
              <Eye size={13} />
              Quick View
            </button>

            {/* Add to Cart */}
            {product.inStock && (
              <button
                onClick={handleAddToCart}
                className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full shadow-lg transition transform translate-y-2 group-hover:translate-y-0 duration-300 delay-75 ${
                  addedFeedback
                    ? 'bg-green-500 text-white'
                    : 'bg-[#0A0F2C] text-white hover:bg-black'
                }`}
              >
                <ShoppingBag size={13} />
                {addedFeedback ? 'Ditambahkan!' : 'Add to Cart'}
              </button>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1">{product.category}</p>
          <h3 className="font-extrabold text-[#0A0F2C] text-base leading-snug mb-1">{product.name}</h3>
          <p className="text-xs text-gray-400 font-medium mb-3">{product.subtitle}</p>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {product.originalPrice && (
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-xs text-gray-400 line-through font-medium">
                    Rp {product.originalPrice.toLocaleString('id-ID')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="bg-red-50 text-red-600 px-1.5 py-0.5 text-[10px] rounded-md font-extrabold">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
              )}
              <span className={`font-extrabold text-base ${product.originalPrice ? 'text-red-600' : 'text-[#0A0F2C]'}`}>
                Rp {product.price.toLocaleString('id-ID')}
              </span>
            </div>
            <span className="text-[11px] text-gray-400 font-medium self-end pb-1">{product.sizes?.join(' / ')}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
