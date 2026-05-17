import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ShoppingBag, User, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';

const navLinks = [
  { to: '/', label: 'Home', exact: true },
  { to: '/products', label: 'Products' },
  { to: '/contact', label: 'Contact' },
  { to: '/sale', label: 'Sale', highlight: true },
  { to: '/catalogue', label: 'Catalogue' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, isCartOpen, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const [accountDropdown, setAccountDropdown] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 100);
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = (mobileOpen || searchOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, searchOpen]);

  const filteredProducts = searchQuery.length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchSelect = (id) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(`/products/${id}`);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-white/80 backdrop-blur-sm py-4'} border-b border-gray-100`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0" onClick={() => setMobileOpen(false)}>
            <img src="/logo-sorae.svg" alt="SORAE" className="h-7 w-auto" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                className={({ isActive }) =>
                  `text-sm font-semibold tracking-wide transition-colors duration-200 ${
                    link.highlight
                      ? 'text-blue-600 hover:text-blue-800'
                      : isActive
                        ? 'text-[#0A0F2C]'
                        : 'text-gray-500 hover:text-[#0A0F2C]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <button
              id="navbar-search-btn"
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-xl hover:bg-gray-100 transition text-gray-600 hover:text-[#0A0F2C]"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Account */}
            <div className="relative hidden sm:block">
              <button
                id="navbar-account-btn"
                onClick={() => user ? setAccountDropdown(!accountDropdown) : navigate('/login')}
                className="p-2.5 rounded-xl hover:bg-gray-100 transition text-gray-600 hover:text-[#0A0F2C] flex items-center gap-2"
                aria-label="Account"
              >
                <User size={20} />
                {user && <span className="text-xs font-bold truncate max-w-[80px]">{user.name.split(' ')[0]}</span>}
              </button>

              <AnimatePresence>
                {accountDropdown && user && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-bold text-[#0A0F2C] truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setAccountDropdown(false)}
                        className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#0A0F2C] transition"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => { logout(); setAccountDropdown(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <button
              id="navbar-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 rounded-xl hover:bg-gray-100 transition text-gray-600 hover:text-[#0A0F2C] relative"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#2563EB] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center"
                >
                  {cartCount > 9 ? '9+' : cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 transition text-gray-700 ml-1"
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 right-0 z-50 bg-white shadow-2xl rounded-b-3xl overflow-hidden"
            >
              <div className="max-w-2xl mx-auto p-6">
                <div className="flex items-center gap-3 border-b-2 border-[#0A0F2C] pb-4">
                  <Search size={22} className="text-gray-400 flex-shrink-0" />
                  <input
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Cari parfum SORAE..."
                    className="flex-1 text-lg font-medium text-[#0A0F2C] placeholder-gray-400 outline-none bg-transparent"
                  />
                  <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>

                <AnimatePresence>
                  {filteredProducts.length > 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4 space-y-2">
                      {filteredProducts.map(p => (
                        <button
                          key={p.id}
                          onClick={() => handleSearchSelect(p.id)}
                          className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition text-left group"
                        >
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-[#0A0F2C] group-hover:text-blue-600 transition">{p.name}</p>
                            <p className="text-sm text-gray-400">{p.category} · {p.subtitle}</p>
                          </div>
                          <span className="ml-auto font-bold text-[#0A0F2C]">Rp {p.price.toLocaleString('id-ID')}</span>
                        </button>
                      ))}
                    </motion.div>
                  ) : searchQuery.length > 1 ? (
                    <p className="pt-6 text-center text-gray-400 font-medium">Produk tidak ditemukan untuk "{searchQuery}"</p>
                  ) : (
                    <div className="pt-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Koleksi Populer</p>
                      <div className="flex flex-wrap gap-2">
                        {['Breeze Mist', 'Golden Hour', 'Baby Buddy', 'Cherry Bloom'].map(tag => (
                          <button
                            key={tag}
                            onClick={() => setSearchQuery(tag)}
                            className="px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold text-gray-600 hover:bg-[#0A0F2C] hover:text-white transition"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-white z-50 md:hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <img src="/logo-sorae.svg" alt="SORAE" className="h-7 w-auto" />
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 transition">
                  <X size={21} />
                </button>
              </div>

              <nav className="flex flex-col p-4 gap-1 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.exact}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `block text-base font-bold py-3 px-4 rounded-xl transition ${
                          link.highlight ? 'text-blue-600' : isActive ? 'bg-gray-50 text-[#0A0F2C]' : 'text-gray-700 hover:bg-gray-50 hover:text-[#0A0F2C]'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="p-5 border-t border-gray-100 space-y-3">
                {user ? (
                  <div className="bg-gray-50 rounded-2xl p-4 mb-2">
                    <p className="text-sm font-bold text-[#0A0F2C]">{user.name}</p>
                    {user.role === 'admin' && (
                      <Link to="/admin" onClick={() => setMobileOpen(false)} className="text-xs font-bold text-blue-600 block mt-2">Masuk Dashboard Admin</Link>
                    )}
                    <button onClick={() => { logout(); setMobileOpen(false); }} className="text-xs font-bold text-red-500 mt-3">Logout</button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 py-3.5 rounded-2xl font-extrabold tracking-wide hover:border-[#0A0F2C] hover:text-[#0A0F2C] transition"
                  >
                    <User size={18} />
                    Masuk Akun
                  </Link>
                )}
                
                <button
                  onClick={() => { setIsCartOpen(true); setMobileOpen(false); }}
                  className="flex items-center justify-center w-full gap-2 bg-[#0A0F2C] text-white py-3.5 rounded-2xl font-extrabold tracking-wide hover:bg-black transition shadow-lg"
                >
                  <ShoppingBag size={18} />
                  Keranjang {cartCount > 0 && <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">{cartCount}</span>}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
