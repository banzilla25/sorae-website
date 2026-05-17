import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Tag, Users, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const adminNavLinks = [
  { to: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} />, exact: true },
  { to: '/admin/products', label: 'Produk', icon: <Package size={20} /> },
  { to: '/admin/orders', label: 'Pesanan', icon: <ShoppingCart size={20} /> },
  { to: '/admin/promotions', label: 'Promosi', icon: <Tag size={20} /> },
  { to: '/admin/customers', label: 'Pelanggan', icon: <Users size={20} /> },
  { to: '/admin/settings', label: 'Pengaturan', icon: <Settings size={20} /> },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0A0F2C] text-white">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
            S
          </div>
          <div>
            <h2 className="font-extrabold text-sm tracking-wider">SORAE</h2>
            <p className="text-[10px] text-blue-300 uppercase tracking-widest font-semibold">Admin Panel</p>
          </div>
        </div>
        <button className="md:hidden p-1 hover:bg-white/10 rounded-lg transition" onClick={() => setMobileMenuOpen(false)}>
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-bold text-blue-300/50 uppercase tracking-widest px-3 mb-3 mt-2">Menu Utama</div>
        {adminNavLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.exact}
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-xl transition font-medium text-sm ${
                isActive ? 'bg-blue-600 text-white shadow-lg' : 'text-blue-100/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
            <Users size={16} className="text-blue-300" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">{user.name}</p>
            <p className="text-xs text-blue-300/70 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition text-sm font-bold"
        >
          <LogOut size={16} /> Keluar
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F4F7FB] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 flex-shrink-0 h-full shadow-2xl z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-72 z-50 md:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header Bar */}
        <header className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#0A0F2C] rounded text-white flex items-center justify-center font-bold text-xs">
              S
            </div>
            <span className="font-extrabold text-[#0A0F2C] text-sm tracking-widest">ADMIN</span>
          </div>
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 bg-gray-100 rounded-lg text-gray-700">
            <Menu size={20} />
          </button>
        </header>

        {/* Dynamic Nested Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
