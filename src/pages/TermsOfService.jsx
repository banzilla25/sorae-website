import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <div className="pt-32 pb-24 px-6 bg-[#F4F7FB] min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-gray-100"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#0A0F2C] mb-4">Syarat & Ketentuan</h1>
        <p className="text-gray-400 font-medium mb-12">Terakhir Diperbarui: April 2026</p>

        <div className="prose prose-blue max-w-none text-gray-600 space-y-8 leading-relaxed">
          <section>
            <p>
              Dengan mengunjungi situs kami dan/atau membeli produk SORAE, Anda menyetujui untuk terikat oleh syarat dan ketentuan berikut ("Syarat Layanan", "TOS").
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A0F2C] mb-4">1. Ketentuan Umum & Produk</h2>
            <p>
              SORAE adalah merek parfum (Eau De Parfum) lokal. Semua deskripsi produk, termasuk spesifikasi wangi (notes) dan volume (50ml) telah dibuat seakurat mungkin. Namun, kami tidak menjamin bahwa tampilan warna botol atau cairan pada layar monitor Anda akan 100% akurat.
            </p>
            <div className="mt-6 p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2">Perhatian Khusus Produk Kosmetik/Parfum:</h3>
              <p className="text-blue-800 text-sm">
                Produk kami ditujukan untuk penggunaan luar. Ketahanan aroma (SPL) dapat berbeda pada setiap individu tergantung pada jenis kulit, suhu tubuh, dan cuaca. Kami menyarankan Anda untuk membaca komposisi produk. Jika Anda memiliki riwayat alergi kulit terhadap bahan pewangi tertentu, harap lakukan patch test (uji tempel) terlebih dahulu. SORAE tidak bertanggung jawab atas reaksi alergi yang timbul akibat penggunaan produk.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A0F2C] mb-4">2. Harga & Pembayaran</h2>
            <p>
              Harga produk kami (termasuk harga satuan dan harga promosi bundle) mengikuti harga final yang tertera di halaman toko resmi kami pada platform marketplace (Shopee, Tokopedia, dan TikTok Shop). Harga dapat berubah sewaktu-waktu mengikuti program promosi platform tanpa pemberitahuan sebelumnya dari pihak situs web ini. Segala proses transaksi, pembayaran, dan keamanan pembayaran diproses secara langsung oleh mitra marketplace pilihan Anda.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A0F2C] mb-4">3. Pengiriman dan Pengembalian (Return Policy)</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-[#0A0F2C]">Pengiriman:</h3>
                <p>Proses pengiriman mengikuti sistem dan ketentuan dari platform marketplace tempat Anda melakukan checkout. Keterlambatan yang disebabkan oleh pihak logistik/ekspedisi berada di luar kendali kami.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#0A0F2C]">Kebijakan Pengembalian (Garansi Botol Pecah):</h3>
                <p>Kami memastikan produk dikemas dengan aman (menggunakan bubble wrap). Kami hanya menerima pengembalian atau penukaran barang jika botol diterima dalam keadaan pecah/bocor yang dibuktikan dengan Video Unboxing utuh tanpa jeda sejak paket pertama kali dibuka. Klaim dilakukan melalui sistem komplain pada masing-masing marketplace. Kami tidak menerima retur barang dengan alasan "tidak suka dengan wanginya" karena deskripsi notes sudah dicantumkan secara transparan.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A0F2C] mb-4">4. Batasan Tanggung Jawab</h2>
            <p>
              Dalam keadaan apa pun, SORAE, direktur, petugas, karyawan, atau afiliasi kami tidak bertanggung jawab atas cedera, kerugian, klaim, atau kerusakan langsung, tidak langsung, insidental, atau konsekuensial apa pun (termasuk reaksi medis/alergi pada kulit) yang timbul dari penggunaan Anda atas salah satu produk kami.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
