import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ChevronDown, X, ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import ProductQuickView from '../components/product/ProductQuickView';

const CATEGORIES = ['Fresh', 'Oriental', 'Floral', 'Gourmand'];
const SORT_OPTIONS = [
  { value: 'default', label: 'A–Z Nama' },
  { value: 'price-asc', label: 'Harga: Terendah' },
  { value: 'price-desc', label: 'Harga: Tertinggi' },
  { value: 'newest', label: 'Terbaru' },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState('default');
  const [sortOpen, setSortOpen] = useState(false);

  // Filters
  const [inStockOnly, setInStockOnly] = useState(false);
  const [outOfStockOnly, setOutOfStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const cat = searchParams.get('category');
    return cat ? [cat] : [];
  });

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (inStockOnly) result = result.filter(p => p.inStock);
    if (outOfStockOnly) result = result.filter(p => !p.inStock);
    if (selectedCategories.length > 0) result = result.filter(p => selectedCategories.includes(p.category));
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'default': result.sort((a, b) => a.name.localeCompare(b.name)); break;
    }

    return result;
  }, [inStockOnly, outOfStockOnly, selectedCategories, priceRange, sort]);

  const clearFilters = () => {
    setInStockOnly(false);
    setOutOfStockOnly(false);
    setSelectedCategories([]);
    setPriceRange([0, 200000]);
  };

  const hasActiveFilters = inStockOnly || outOfStockOnly || selectedCategories.length > 0 || priceRange[1] < 200000;

  const FilterPanel = () => (
    <div className="space-y-8">
      {/* Availability */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-[#0A0F2C] text-sm uppercase tracking-wider">Ketersediaan</h3>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-xs text-blue-600 font-bold hover:underline">Reset</button>
          )}
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={e => setInStockOnly(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 accent-[#0A0F2C]"
            />
            <span className="text-sm font-medium text-gray-600 group-hover:text-[#0A0F2C] transition">
              In Stock ({products.filter(p => p.inStock).length})
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={outOfStockOnly}
              onChange={e => setOutOfStockOnly(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 accent-[#0A0F2C]"
            />
            <span className="text-sm font-medium text-gray-600 group-hover:text-[#0A0F2C] transition">
              Out of Stock ({products.filter(p => !p.inStock).length})
            </span>
          </label>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-extrabold text-[#0A0F2C] text-sm uppercase tracking-wider mb-4">Kategori</h3>
        <div className="space-y-3">
          {CATEGORIES.map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="w-4 h-4 rounded border-gray-300 accent-[#0A0F2C]"
              />
              <span className="text-sm font-medium text-gray-600 group-hover:text-[#0A0F2C] transition">
                {cat} ({products.filter(p => p.category === cat).length})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-extrabold text-[#0A0F2C] text-sm uppercase tracking-wider mb-4">Harga</h3>
        <input
          type="range"
          min={0}
          max={200000}
          step={10000}
          value={priceRange[1]}
          onChange={e => setPriceRange([0, Number(e.target.value)])}
          className="w-full accent-[#0A0F2C]"
        />
        <div className="flex justify-between text-xs font-bold text-gray-500 mt-2">
          <span>Rp 0</span>
          <span>Rp {priceRange[1].toLocaleString('id-ID')}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Header */}
      <div className="pt-24 pb-8 px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 font-medium mb-4">
            <Link to="/" className="hover:text-[#0A0F2C] transition">Home</Link>
            <ChevronRight size={14} />
            <span className="text-[#0A0F2C] font-bold">Products</span>
          </nav>
          <h1 className="text-3xl font-extrabold text-[#0A0F2C]">Semua Produk</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex gap-10">

          {/* ── Sidebar Filter (Desktop) ── */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <FilterPanel />
          </aside>

          {/* ── Products Grid ── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button
                  onClick={() => setFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 hover:border-[#0A0F2C] transition"
                >
                  <SlidersHorizontal size={15} />
                  Filter
                  {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                </button>
                <span className="text-sm font-medium text-gray-500">
                  {filtered.length} produk
                </span>
              </div>

              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(p => !p)}
                  className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 hover:border-[#0A0F2C] transition"
                >
                  Sort by: {SORT_OPTIONS.find(o => o.value === sort)?.label}
                  <ChevronDown size={14} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {sortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-20 min-w-[180px]"
                    >
                      {SORT_OPTIONS.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => { setSort(opt.value); setSortOpen(false); }}
                          className={`block w-full text-left px-5 py-3 text-sm font-medium hover:bg-gray-50 transition ${sort === opt.value ? 'font-bold text-[#0A0F2C] bg-gray-50' : 'text-gray-600'}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map(cat => (
                  <span key={cat} className="flex items-center gap-1.5 bg-[#0A0F2C] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {cat}
                    <button onClick={() => toggleCategory(cat)}><X size={11} /></button>
                  </span>
                ))}
                {inStockOnly && (
                  <span className="flex items-center gap-1.5 bg-[#0A0F2C] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    In Stock <button onClick={() => setInStockOnly(false)}><X size={11} /></button>
                  </span>
                )}
                <button onClick={clearFilters} className="text-xs font-bold text-gray-500 hover:text-red-500 transition px-2">Clear All</button>
              </div>
            )}

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🫧</p>
                <h3 className="text-xl font-extrabold text-[#0A0F2C] mb-2">Produk tidak ditemukan</h3>
                <p className="text-gray-400 font-medium mb-6">Coba ubah filter kamu</p>
                <button onClick={clearFilters} className="bg-[#0A0F2C] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-black transition">
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
              onClick={() => setFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <h2 className="font-extrabold text-[#0A0F2C]">Filter</h2>
                <button onClick={() => setFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <FilterPanel />
              </div>
              <div className="p-5 border-t border-gray-100">
                <button
                  onClick={() => setFilterOpen(false)}
                  className="w-full bg-[#0A0F2C] text-white py-4 rounded-2xl font-extrabold hover:bg-black transition"
                >
                  Lihat {filtered.length} Produk
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quick View */}
      {quickViewProduct && (
        <ProductQuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </>
  );
}
