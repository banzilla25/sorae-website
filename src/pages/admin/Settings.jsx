export default function Settings() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0A0F2C]">Pengaturan Sistem</h1>
          <p className="text-gray-500 font-medium mt-1">Konfigurasi API, Midtrans, RajaOngkir, dan Tracking.</p>
        </div>
        <button className="bg-[#2563EB] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-blue-600 transition">
          Simpan Pengaturan
        </button>
      </div>
      
      <div className="space-y-6">
        {/* API Midtrans */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <h3 className="text-lg font-extrabold text-[#0A0F2C] mb-4 flex items-center gap-2">
            💳 Integrasi Midtrans
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Client Key (Public)</label>
              <input type="text" placeholder="SB-Mid-client-..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Server Key (Secret)</label>
              <input type="password" placeholder="SB-Mid-server-..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-blue-500 outline-none" />
            </div>
          </div>
        </div>

        {/* API RajaOngkir */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <h3 className="text-lg font-extrabold text-[#0A0F2C] mb-4 flex items-center gap-2">
            🚚 Integrasi RajaOngkir
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">API Key</label>
              <input type="text" placeholder="Masukkan API Key RajaOngkir..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Titik Gudang Asal (Kota ID)</label>
              <input type="text" placeholder="Misal: 151 (Jakarta Barat)" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-blue-500 outline-none" />
            </div>
          </div>
        </div>

        {/* API Meta CAPI */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <h3 className="text-lg font-extrabold text-[#0A0F2C] mb-4 flex items-center gap-2">
            📈 Meta Conversions API (CAPI)
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Pixel ID</label>
              <input type="text" placeholder="Contoh: 941760328740821" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">Access Token</label>
              <input type="password" placeholder="EAA..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-blue-500 outline-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
