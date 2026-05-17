import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Lock, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const PROVINCES = ['Aceh','Bali','Banten','Bengkulu','DI Yogyakarta','DKI Jakarta','Gorontalo','Jambi','Jawa Barat','Jawa Tengah','Jawa Timur','Kalimantan Barat','Kalimantan Selatan','Kalimantan Tengah','Kalimantan Timur','Kalimantan Utara','Kepulauan Bangka Belitung','Kepulauan Riau','Lampung','Maluku','Maluku Utara','Nusa Tenggara Barat','Nusa Tenggara Timur','Papua','Papua Barat','Riau','Sulawesi Barat','Sulawesi Selatan','Sulawesi Tengah','Sulawesi Tenggara','Sulawesi Utara','Sumatera Barat','Sumatera Selatan','Sumatera Utara'];

const SHIPPING_METHODS = [
  { id: 'jne-reg', name: 'JNE Reguler', eta: '2–4 hari kerja', price: 15000 },
  { id: 'jne-yes', name: 'JNE YES (Yakin Esok Sampai)', eta: '1 hari kerja', price: 25000 },
  { id: 'sicepat', name: 'SiCepat REG', eta: '2–3 hari kerja', price: 13000 },
];

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: info, 2: shipping, 3: payment, 4: success
  const [billingOption, setBillingOption] = useState('same'); // 'same' | 'different'
  const [selectedShipping, setSelectedShipping] = useState(SHIPPING_METHODS[0].id);
  const [submitted, setSubmitted] = useState(false);

  const shippingCost = SHIPPING_METHODS.find(m => m.id === selectedShipping)?.price ?? 0;
  const total = cartTotal + shippingCost;

  // Track InitiateCheckout when page loads
  useEffect(() => {
    if (items.length > 0) {
      window.trackEvent?.('InitiateCheckout', {
        value: cartTotal,
        currency: 'IDR',
        content_name: 'Checkout Step',
        num_items: items.length
      });
    }
  }, []);

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    addressExtra: '',
    city: '',
    province: 'Banten',
    postalCode: '',
    phone: '',
  });

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const orderId = `SOR-${Date.now().toString().slice(-6)}`;

    // Prepare item details for Midtrans
    const item_details = items.map(item => ({
      id: item.product.id,
      price: item.product.price,
      quantity: item.quantity,
      name: `${item.product.name} (${item.size})`
    }));

    // Add shipping cost as an item
    if (shippingCost > 0) {
      item_details.push({
        id: 'SHIPPING',
        price: shippingCost,
        quantity: 1,
        name: `Ongkos Kirim (${selectedShipping})`
      });
    }

    try {
      // 1. Fetch token from our local Mini Backend
      const response = await fetch('/api/create-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: orderId,
          gross_amount: total,
          item_details: item_details,
          customer_details: {
            first_name: form.firstName,
            last_name: form.lastName,
            email: form.email,
            phone: form.phone,
            shipping_address: {
              first_name: form.firstName,
              last_name: form.lastName,
              email: form.email,
              phone: form.phone,
              address: `${form.address} ${form.addressExtra}`,
              city: form.city,
              postal_code: form.postalCode,
              country_code: "IDN"
            }
          }
        })
      });

      const data = await response.json();

      if (!data.token) {
        throw new Error('Gagal mendapatkan token pembayaran');
      }

      // 2. Save pending order to LocalStorage for Admin Dashboard
      const existingOrders = JSON.parse(localStorage.getItem('sorae_orders') || '[]');
      const newOrder = {
        id: orderId,
        date: new Date().toISOString(),
        customer: form,
        items: items,
        total: total,
        shippingMethod: selectedShipping,
        status: 'pending' // Will change to paid later if successful
      };
      localStorage.setItem('sorae_orders', JSON.stringify([...existingOrders, newOrder]));

      // 3. Trigger Midtrans Snap Pop-up
      window.snap.pay(data.token, {
        onSuccess: function(result){
          // Mark as paid in local storage
          const orders = JSON.parse(localStorage.getItem('sorae_orders') || '[]');
          const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status: 'paid' } : o);
          localStorage.setItem('sorae_orders', JSON.stringify(updatedOrders));
          
          clearCart();
          setStep(4);
        },
        onPending: function(result){
          clearCart();
          setStep(4); // Keep step 4 for pending as well (waiting for transfer)
        },
        onError: function(result){
          alert("Pembayaran gagal!");
          setIsProcessing(false);
        },
        onClose: function(){
          setIsProcessing(false);
        }
      });

    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat memproses pembayaran. Coba lagi.');
      setIsProcessing(false);
    }
  };

  // Empty cart guard
  if (items.length === 0 && step !== 4) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-6 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h1 className="text-2xl font-extrabold text-[#0A0F2C] mb-3">Keranjang kamu kosong</h1>
        <Link to="/products" className="text-blue-600 font-bold hover:underline">← Kembali belanja</Link>
      </div>
    );
  }

  // Success screen
  if (step === 4) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-6 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={40} className="text-green-600" />
          </motion.div>
          <h1 className="text-3xl font-extrabold text-[#0A0F2C] mb-3">Pesanan Diterima!</h1>
          <p className="text-gray-500 font-medium mb-2 max-w-md mx-auto">
            Terima kasih sudah memesan di SORAE. Tim kami akan segera memproses pesananmu dan menghubungi melalui WhatsApp untuk konfirmasi pembayaran.
          </p>
          <p className="text-sm text-gray-400 font-medium mb-10">Nomor order: <span className="font-bold text-[#0A0F2C]">SOR-{Date.now().toString().slice(-6)}</span></p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href="https://api.whatsapp.com/send?phone=6281399686164&text=Halo%20SORAE%2C%20saya%20baru%20saja%20melakukan%20pemesanan%20dan%20ingin%20konfirmasi%20pembayaran."
              target="_blank" rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-green-700 transition"
            >
              Konfirmasi via WhatsApp
            </a>
            <Link to="/products" className="border-2 border-[#0A0F2C] text-[#0A0F2C] px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition">
              Lanjut Belanja
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <img src="/logo-sorae.svg" alt="SORAE" className="h-7 w-auto" />
          <nav className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            <Link to="/cart">Keranjang</Link>
            <ChevronRight size={12} />
            <span className="text-[#0A0F2C]">Informasi</span>
            <ChevronRight size={12} />
            <span>Pengiriman</span>
            <ChevronRight size={12} />
            <span>Pembayaran</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
          {/* LEFT: Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* ── Contact ── */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-extrabold text-[#0A0F2C]">Kontak</h2>
                  <button type="button" className="text-xs font-bold text-[#2563EB] hover:underline">Masuk</button>
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium text-[#0A0F2C] placeholder-gray-400 outline-none focus:border-[#0A0F2C] focus:ring-2 focus:ring-[#0A0F2C]/10 transition"
                />
              </div>

              {/* ── Delivery ── */}
              <div>
                <h2 className="text-lg font-extrabold text-[#0A0F2C] mb-4">Pengiriman</h2>
                <div className="space-y-3">
                  {/* Country */}
                  <div className="relative">
                    <select
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium text-[#0A0F2C] outline-none focus:border-[#0A0F2C] focus:ring-2 focus:ring-[#0A0F2C]/10 transition appearance-none bg-white"
                      defaultValue="ID"
                    >
                      <option value="ID">Indonesia</option>
                    </select>
                    <ChevronDown size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Name */}
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      name="firstName"
                      placeholder="Nama depan (opsional)"
                      value={form.firstName}
                      onChange={handleChange}
                      className="border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium text-[#0A0F2C] placeholder-gray-400 outline-none focus:border-[#0A0F2C] focus:ring-2 focus:ring-[#0A0F2C]/10 transition"
                    />
                    <input
                      name="lastName"
                      placeholder="Nama belakang"
                      required
                      value={form.lastName}
                      onChange={handleChange}
                      className="border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium text-[#0A0F2C] placeholder-gray-400 outline-none focus:border-[#0A0F2C] focus:ring-2 focus:ring-[#0A0F2C]/10 transition"
                    />
                  </div>

                  <input
                    name="address"
                    placeholder="Alamat lengkap"
                    required
                    value={form.address}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium text-[#0A0F2C] placeholder-gray-400 outline-none focus:border-[#0A0F2C] focus:ring-2 focus:ring-[#0A0F2C]/10 transition"
                  />
                  <input
                    name="addressExtra"
                    placeholder="Nomor apartemen, gedung, dll. (opsional)"
                    value={form.addressExtra}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium text-[#0A0F2C] placeholder-gray-400 outline-none focus:border-[#0A0F2C] focus:ring-2 focus:ring-[#0A0F2C]/10 transition"
                  />
                  <input
                    name="city"
                    placeholder="Kota / Kabupaten"
                    required
                    value={form.city}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium text-[#0A0F2C] placeholder-gray-400 outline-none focus:border-[#0A0F2C] focus:ring-2 focus:ring-[#0A0F2C]/10 transition"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <select
                        name="province"
                        value={form.province}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium text-[#0A0F2C] outline-none focus:border-[#0A0F2C] focus:ring-2 focus:ring-[#0A0F2C]/10 transition appearance-none bg-white"
                      >
                        {PROVINCES.map(p => <option key={p}>{p}</option>)}
                      </select>
                      <ChevronDown size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    <input
                      name="postalCode"
                      placeholder="Kode pos"
                      required
                      value={form.postalCode}
                      onChange={handleChange}
                      className="border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium text-[#0A0F2C] placeholder-gray-400 outline-none focus:border-[#0A0F2C] focus:ring-2 focus:ring-[#0A0F2C]/10 transition"
                    />
                  </div>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="No. HP / WhatsApp"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium text-[#0A0F2C] placeholder-gray-400 outline-none focus:border-[#0A0F2C] focus:ring-2 focus:ring-[#0A0F2C]/10 transition"
                  />
                </div>
              </div>

              {/* ── Shipping Method ── */}
              <div>
                <h2 className="text-lg font-extrabold text-[#0A0F2C] mb-4">Metode Pengiriman</h2>
                {form.address ? (
                  <div className="space-y-3">
                    {SHIPPING_METHODS.map(method => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition ${
                          selectedShipping === method.id
                            ? 'border-[#0A0F2C] bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="shipping"
                          value={method.id}
                          checked={selectedShipping === method.id}
                          onChange={() => setSelectedShipping(method.id)}
                          className="accent-[#0A0F2C] w-4 h-4"
                        />
                        <div className="flex-1">
                          <p className="font-bold text-[#0A0F2C] text-sm">{method.name}</p>
                          <p className="text-xs text-gray-400 font-medium">{method.eta}</p>
                        </div>
                        <span className="font-extrabold text-sm text-[#0A0F2C]">
                          Rp {method.price.toLocaleString('id-ID')}
                        </span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
                    <p className="text-sm text-gray-400 font-medium">Masukkan alamat pengiriman untuk melihat metode yang tersedia.</p>
                  </div>
                )}
              </div>

              {/* ── Payment ── */}
              <div>
                <h2 className="text-lg font-extrabold text-[#0A0F2C] mb-2">Pembayaran</h2>
                <p className="text-sm text-gray-400 font-medium mb-4 flex items-center gap-1.5">
                  <Lock size={12} /> Semua transaksi aman dan terenkripsi
                </p>

                {/* Payment Option */}
                <div className="border-2 border-[#0A0F2C] rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-[#0A0F2C] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#0A0F2C]" />
                      </div>
                      <span className="font-bold text-sm text-[#0A0F2C]">Pembayaran Otomatis (Midtrans)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Placeholder for payment logos */}
                      <span className="text-xs font-bold text-gray-400">QRIS / VA / E-Wallet</span>
                    </div>
                  </div>
                  <div className="px-5 py-4 text-sm text-gray-500 font-medium leading-relaxed">
                    Setelah menekan "Pesan Sekarang", halaman sistem pembayaran Midtrans akan muncul. Anda dapat membayar dengan aman menggunakan BCA, Mandiri, QRIS, GoPay, OVO, atau metode lainnya secara otomatis.
                  </div>
                </div>
              </div>

              {/* ── Billing Address ── */}
              <div>
                <h2 className="text-lg font-extrabold text-[#0A0F2C] mb-4">Alamat Tagihan</h2>
                <div className="space-y-3">
                  <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition ${billingOption === 'same' ? 'border-[#0A0F2C] bg-gray-50' : 'border-gray-200'}`}>
                    <input type="radio" name="billing" checked={billingOption === 'same'} onChange={() => setBillingOption('same')} className="accent-[#0A0F2C] w-4 h-4" />
                    <span className="font-medium text-sm text-[#0A0F2C]">Sama dengan alamat pengiriman</span>
                  </label>
                  <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition ${billingOption === 'different' ? 'border-[#0A0F2C] bg-gray-50' : 'border-gray-200'}`}>
                    <input type="radio" name="billing" checked={billingOption === 'different'} onChange={() => setBillingOption('different')} className="accent-[#0A0F2C] w-4 h-4" />
                    <span className="font-medium text-sm text-[#0A0F2C]">Gunakan alamat tagihan yang berbeda</span>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full bg-[#0A0F2C] text-white py-4 rounded-2xl font-extrabold text-base transition shadow-lg ${
                  isProcessing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-black hover:shadow-xl hover:-translate-y-0.5'
                }`}
              >
                {isProcessing ? 'Memproses...' : 'Pesan Sekarang'}
              </button>

              {/* Footer links */}
              <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400 font-medium pt-4">
                <Link to="/privacy-policy" className="hover:text-[#0A0F2C] transition">Kebijakan Privasi</Link>
                <Link to="/contact" className="hover:text-[#0A0F2C] transition">Pengiriman</Link>
                <Link to="/terms-of-service" className="hover:text-[#0A0F2C] transition">Syarat & Ketentuan</Link>
              </div>
            </form>
          </div>

          {/* RIGHT: Order Summary */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:block"
          >
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sticky top-28">
              <h3 className="font-extrabold text-[#0A0F2C] mb-5">Ringkasan</h3>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#0A0F2C] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#0A0F2C] text-sm leading-snug truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-400 font-medium">{item.size}</p>
                    </div>
                    <span className="font-extrabold text-sm text-[#0A0F2C] flex-shrink-0">
                      Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-sm font-medium text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#0A0F2C]">Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-gray-500">
                  <span>Pengiriman</span>
                  <span className="font-bold text-[#0A0F2C]">Rp {shippingCost.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 mt-4 pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-[#0A0F2C]">Total</span>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-medium mb-0.5">IDR</p>
                    <p className="text-2xl font-extrabold text-[#0A0F2C]">Rp {total.toLocaleString('id-ID')}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
