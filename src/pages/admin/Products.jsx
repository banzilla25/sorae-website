import { useState, useEffect } from 'react';
import { products as initialProducts } from '../../data/products';
import { Edit2, Package, Tag } from 'lucide-react';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // In a real app this would be a DB fetch
    setProducts(initialProducts);
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0A0F2C]">Katalog Produk</h1>
          <p className="text-gray-500 font-medium mt-1">Kelola stok, harga, dan ketersediaan varian.</p>
        </div>
        <button className="bg-[#0A0F2C] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-black transition shadow-md">
          + Tambah Produk
        </button>
      </div>
      
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Produk</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Harga Utama</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Stok</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl border border-gray-200 overflow-hidden flex-shrink-0 bg-gray-50">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-[#0A0F2C]">{product.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{product.subtitle} • BPOM: {product.bpom}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-lg">
                      <Tag size={12} /> {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-extrabold text-[#0A0F2C] text-sm">
                    Rp {product.price.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4">
                    {product.inStock ? (
                      <span className="inline-flex items-center gap-1.5 text-green-700 font-bold text-sm">
                        <Package size={14} className="text-green-500" /> Tersedia
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-red-700 font-bold text-sm">
                        <Package size={14} className="text-red-500" /> Habis
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-[#0A0F2C] transition p-2">
                      <Edit2 size={18} />
                    </button>
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
