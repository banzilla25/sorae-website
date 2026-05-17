import { useState, useEffect } from 'react';
import { X, Truck, Package, CheckCircle } from 'lucide-react';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [resiInput, setResiInput] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const storedOrders = JSON.parse(localStorage.getItem('sorae_orders') || '[]');
    setOrders(storedOrders.reverse());
  };

  const updateOrderStatus = (id, newStatus, resi = null) => {
    const updatedOrders = orders.map(o => {
      if (o.id === id) {
        return { ...o, status: newStatus, resi: resi || o.resi };
      }
      return o;
    });
    localStorage.setItem('sorae_orders', JSON.stringify(updatedOrders));
    loadOrders();
    setSelectedOrder(null);
  };

  const renderStatusBadge = (status) => {
    switch(status) {
      case 'paid': return <span className="inline-flex bg-green-100 text-green-800 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider">PAID</span>;
      case 'shipped': return <span className="inline-flex bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider">SHIPPED</span>;
      default: return <span className="inline-flex bg-yellow-100 text-yellow-800 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider">UNPAID</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#0A0F2C]">Manajemen Pesanan</h1>
        <p className="text-gray-500 font-medium mt-1">Pantau status pembayaran Midtrans dan input resi pengiriman.</p>
      </div>
      
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {orders.length === 0 ? (
            <div className="p-16 text-center text-gray-400 font-medium">Belum ada pesanan masuk.</div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Pelanggan</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <span className="font-bold text-[#0A0F2C]">{order.id}</span>
                      <div className="text-xs text-gray-400 mt-1">{new Date(order.date).toLocaleDateString('id-ID')}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-sm text-[#0A0F2C]">{order.customer.firstName} {order.customer.lastName}</div>
                      <div className="text-xs text-gray-500 mt-1">{order.customer.city}, {order.customer.province}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-medium text-gray-600 line-clamp-2 w-48">
                        {order.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-extrabold text-[#0A0F2C] text-sm">
                      Rp {order.total.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4">
                      {renderStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="bg-[#0A0F2C] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-black transition"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0F2C]/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-extrabold text-[#0A0F2C]">Detail Pesanan</h2>
                <p className="text-sm text-gray-500 font-medium mt-1">{selectedOrder.id}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full transition">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Informasi Pelanggan</h3>
                  <p className="font-bold text-[#0A0F2C] text-sm">{selectedOrder.customer.firstName} {selectedOrder.customer.lastName}</p>
                  <p className="text-sm text-gray-600 mt-1">{selectedOrder.customer.email}</p>
                  <p className="text-sm text-gray-600 mt-1">{selectedOrder.customer.phone}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Alamat Pengiriman ({selectedOrder.shippingMethod?.toUpperCase() || 'JNE'})</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedOrder.customer.address} {selectedOrder.customer.addressExtra}<br/>
                    {selectedOrder.customer.city}, {selectedOrder.customer.province} {selectedOrder.customer.postalCode}
                  </p>
                </div>
              </div>

              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Item Pesanan</h3>
              <div className="space-y-3 mb-8 bg-gray-50 p-4 rounded-2xl">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#0A0F2C] bg-white w-6 h-6 flex items-center justify-center rounded-lg shadow-sm">{item.quantity}x</span>
                      <span className="font-medium text-gray-700">{item.product.name} ({item.size})</span>
                    </div>
                    <span className="font-bold text-[#0A0F2C]">Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}</span>
                  </div>
                ))}
                <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between items-center text-sm">
                  <span className="font-bold text-gray-500">Total Transaksi</span>
                  <span className="font-extrabold text-[#0A0F2C] text-base">Rp {selectedOrder.total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {selectedOrder.status === 'paid' && (
                <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-3 flex items-center gap-2">
                    <Truck size={14} /> Proses Pengiriman
                  </h3>
                  <div className="flex gap-3">
                    <input 
                      type="text" 
                      placeholder="Masukkan Nomor Resi..." 
                      className="flex-1 px-4 py-2.5 rounded-xl border border-blue-200 text-sm font-medium outline-none focus:border-blue-400"
                      value={resiInput}
                      onChange={(e) => setResiInput(e.target.value)}
                    />
                    <button 
                      onClick={() => updateOrderStatus(selectedOrder.id, 'shipped', resiInput)}
                      className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition"
                    >
                      Kirim Pesanan
                    </button>
                  </div>
                </div>
              )}
              
              {selectedOrder.status === 'shipped' && (
                <div className="bg-green-50 border border-green-100 p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-green-800 mb-1 flex items-center gap-2">
                      <CheckCircle size={14} /> Pesanan Telah Dikirim
                    </h3>
                    <p className="text-sm font-bold text-green-900">Resi: {selectedOrder.resi}</p>
                  </div>
                  <button 
                    onClick={() => updateOrderStatus(selectedOrder.id, 'paid')}
                    className="text-xs font-bold text-green-700 hover:underline"
                  >
                    Batalkan Pengiriman
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
