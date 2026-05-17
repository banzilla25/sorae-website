import { useState } from 'react';
import { Tag, Calendar } from 'lucide-react';

export default function Promotions() {
  const [promos] = useState([
    { id: '1', code: 'SORAE10', type: 'percentage', value: 10, status: 'active', usage: 45, maxUsage: 100, expiry: '2026-12-31' },
    { id: '2', code: 'FREESHIP', type: 'fixed', value: 20000, status: 'active', usage: 120, maxUsage: 500, expiry: '2026-10-15' },
    { id: '3', code: 'NEWYEAR50', type: 'percentage', value: 50, status: 'expired', usage: 200, maxUsage: 200, expiry: '2026-01-01' },
  ]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0A0F2C]">Promosi & Diskon</h1>
          <p className="text-gray-500 font-medium mt-1">Kelola kode kupon dan diskon khusus.</p>
        </div>
        <button className="bg-[#0A0F2C] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-black transition shadow-md">
          + Buat Kupon Baru
        </button>
      </div>
      
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Kode Kupon</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Nilai Diskon</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Penggunaan</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Berakhir Pada</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {promos.map((promo) => (
                <tr key={promo.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <span className="font-extrabold text-[#0A0F2C] flex items-center gap-2">
                      <Tag size={14} className="text-blue-500" /> {promo.code}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-[#0A0F2C]">
                    {promo.type === 'percentage' ? `${promo.value}%` : `Rp ${promo.value.toLocaleString('id-ID')}`}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-600">
                      {promo.usage} / {promo.maxUsage}
                    </div>
                    <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${(promo.usage / promo.maxUsage) * 100}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600 flex items-center gap-2">
                    <Calendar size={14} /> {new Date(promo.expiry).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4">
                    {promo.status === 'active' ? (
                      <span className="inline-flex bg-green-100 text-green-800 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider">
                        AKTIF
                      </span>
                    ) : (
                      <span className="inline-flex bg-gray-100 text-gray-500 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider">
                        EXPIRED
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
