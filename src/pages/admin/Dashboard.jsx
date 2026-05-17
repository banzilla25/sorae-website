import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Users, DollarSign } from 'lucide-react';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('sorae_orders') || '[]');
    setOrders(storedOrders.reverse());
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalItems = orders.reduce((sum, order) => sum + order.items.reduce((acc, item) => acc + item.quantity, 0), 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#0A0F2C]">Overview Analytics</h1>
        <p className="text-gray-500 font-medium mt-1">Rangkuman performa toko SORAE saat ini.</p>
      </div>

      {/* Stats Widget */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Total Pesanan Baru', value: orders.length, icon: <Package size={24} />, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Total GMV', value: `Rp ${totalRevenue.toLocaleString('id-ID')}`, icon: <DollarSign size={24} />, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Produk Terjual', value: totalItems, icon: <Users size={24} />, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5"
          >
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center flex-shrink-0`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-extrabold text-[#0A0F2C] truncate max-w-[150px] sm:max-w-full" title={stat.value}>{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mini Order List (Preview) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-extrabold text-[#0A0F2C]">Pesanan Terbaru</h2>
        </div>
        
        <div className="overflow-x-auto">
          {orders.length === 0 ? (
            <div className="p-10 text-center text-gray-400 font-medium">Belum ada pesanan masuk.</div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">ID Pesanan</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Pelanggan</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <span className="font-bold text-[#0A0F2C]">{order.id}</span>
                      <div className="text-xs text-gray-400 mt-1">{new Date(order.date).toLocaleDateString('id-ID')}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-sm text-[#0A0F2C]">{order.customer.firstName} {order.customer.lastName}</div>
                      <div className="text-xs text-gray-500 mt-1">{order.customer.email}</div>
                    </td>
                    <td className="px-6 py-4 font-extrabold text-[#0A0F2C] text-sm">
                      Rp {order.total.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4">
                      {order.status === 'paid' ? (
                        <span className="inline-flex bg-green-100 text-green-800 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider">
                          PAID
                        </span>
                      ) : (
                        <span className="inline-flex bg-yellow-100 text-yellow-800 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider">
                          UNPAID
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {orders.length > 5 && (
          <div className="px-6 py-4 border-t border-gray-100 text-center bg-gray-50/50">
            <span className="text-sm font-bold text-blue-600 hover:text-blue-800 cursor-pointer">Lihat Semua Pesanan &rarr;</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
