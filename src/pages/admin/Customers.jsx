import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('sorae_orders') || '[]');
    
    // Extract unique customers based on email
    const customerMap = {};
    storedOrders.forEach(order => {
      const email = order.customer.email;
      if (!customerMap[email]) {
        customerMap[email] = {
          ...order.customer,
          totalOrders: 1,
          totalSpend: order.total,
          lastOrderDate: order.date
        };
      } else {
        customerMap[email].totalOrders += 1;
        customerMap[email].totalSpend += order.total;
        if (new Date(order.date) > new Date(customerMap[email].lastOrderDate)) {
          customerMap[email].lastOrderDate = order.date;
        }
      }
    });

    setCustomers(Object.values(customerMap).sort((a, b) => b.totalSpend - a.totalSpend));
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0A0F2C]">Data Pelanggan</h1>
          <p className="text-gray-500 font-medium mt-1">Daftar pelanggan yang pernah melakukan transaksi.</p>
        </div>
        <button className="bg-white border-2 border-[#0A0F2C] text-[#0A0F2C] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition shadow-sm">
          Export CSV
        </button>
      </div>
      
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {customers.length === 0 ? (
            <div className="p-16 text-center text-gray-400 font-medium">Belum ada data pelanggan.</div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Nama Pelanggan</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Kontak</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Lokasi</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Total Pesanan</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Total Belanja</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customers.map((cust, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#0A0F2C]">{cust.firstName} {cust.lastName}</div>
                      <div className="text-xs text-gray-400 mt-1">Join: {new Date(cust.lastOrderDate).toLocaleDateString('id-ID')}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 font-medium"><Mail size={12}/> {cust.email}</span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 font-medium"><Phone size={12}/> {cust.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 font-medium line-clamp-1 w-40">
                        <MapPin size={12} className="flex-shrink-0"/> {cust.city}, {cust.province}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-[#0A0F2C] bg-gray-100 px-3 py-1 rounded-lg text-sm">{cust.totalOrders}</span>
                    </td>
                    <td className="px-6 py-4 font-extrabold text-[#0A0F2C] text-sm">
                      Rp {cust.totalSpend.toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
