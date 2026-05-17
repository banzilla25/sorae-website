# SORAE E-Commerce - AI Context Document

## 1. Project Concept & Vision
SORAE adalah *Direct-to-Consumer (D2C) Perfume Brand* yang berfokus pada pengalaman berbelanja *frictionless* (minim hambatan). Konsep website ini mengadopsi struktur "Headless E-commerce". UI/UX dioptimalkan untuk konversi maksimal (cocok untuk trafik dari Meta/TikTok Ads) dengan *styling* yang terasa premium, *interactive*, namun ringan tanpa *page reloads*.

## 2. Tech Stack (Current vs Target Scaling)
| Bagian | Teknologi Saat Ini (MVP) | Target (Production Scaling) |
| --- | --- | --- |
| **Frontend** | React SPA (Vite) | Next.js (SSR untuk SEO organik) |
| **Styling** | Tailwind CSS + Framer Motion | Tetap Tailwind CSS |
| **State Mgt.**| React Context API | Tetap Context API / Zustand |
| **Backend/DB**| `LocalStorage` (Mockup E2E) | Supabase (PostgreSQL + Auth) |
| **Payment** | Midtrans (Sandbox + Custom Proxy) | Midtrans (Production) |
| **Storage** | Lokal (`/public/assets/`) | Supabase Storage (CDN CDN) |
| **Logistics** | Manual / Static Data | RajaOngkir / Biteship API |

## 3. Directory Structure & Key Files
Aplikasi ini diatur dalam struktur folder React standar, dengan beberapa perombakan arsitektur kunci:

- **`vite.config.js` (CRITICAL)**: Berisi custom middleware `midtransPlugin()`. Plugin ini "mencegat" (intercept) *request* `POST /api/create-transaction` dari frontend dan bertindak sebagai *mini backend*. Plugin ini menggunakan `midtrans-client` Node.js SDK untuk membuat Snap Token menggunakan `MIDTRANS_SERVER_KEY` secara aman tanpa mengekspos *server key* ke browser, menghindari *CORS issues*, dan mengeliminasi kebutuhan server Express terpisah selama fase *development*.
- **`src/context/`**:
  - `CartContext.jsx`: Menghandle array item di keranjang (`cart`), menghitung subtotal/berat, dan mengatur boolean `isCartOpen` (memanggil Cart Drawer).
  - `AuthContext.jsx`: Menghandle sesi login untuk akses rute Admin.
- **`src/components/`**:
  - `CartDrawer.jsx`: Komponen laci samping (*offcanvas*) yang menggantikan halaman `/cart` konvensional. Terkoneksi erat dengan `CartContext`.
  - `Navbar.jsx`, `Footer.jsx`, `FloatingUI.jsx`: UI elemen global yang di-*hide* secara kondisional di rute `/admin` dan `/checkout` melalui `App.jsx`.
- **`src/pages/` (Public Routes)**:
  - `Home.jsx`, `Products.jsx`, `ProductDetail.jsx`: Menampilkan data dari `src/data/products.js`.
  - `Checkout.jsx` (CRITICAL): Halaman pemrosesan pesanan. Terdapat fungsi `window.snap.pay()` yang memanggil *Midtrans Pop-up* setelah menerima token dari `fetch('/api/create-transaction')`. Terdapat juga tombol dev `🧪 Isi Data (Testing)` untuk proses *autofill* cepat.
- **`src/pages/admin/` (Back-Office Routes)**:
  - `AdminLayout.jsx`: Wrapper untuk *sidebar* navigasi admin.
  - `Dashboard.jsx`: Menampilkan *Overview Analytics* (GMV, Total Pesanan) yang dihitung *on-the-fly* dari *LocalStorage*.
  - `Orders.jsx`: Menampilkan tabel pesanan dengan *Modal Detail*. Terdapat tombol *Kirim Pesanan* untuk mengubah status pesanan dari "PAID" menjadi "SHIPPED" dan menginput Nomor Resi.
  - `Products.jsx`, `Customers.jsx`, `Promotions.jsx`: Modul-modul tabel manajemen CRUD untuk operasional admin.

## 4. What We Have Accomplished (MVP Capabilities)
1. **Frictionless UI/UX:** Transisi *smooth* menggunakan *Framer Motion*, tombol interaktif, desain *modern luxury* dengan *layout* berbasis laci (*drawer*) untuk mengurangi klik tidak perlu.
2. **Midtrans Snap Natively Integrated:** 
   - Sistem *checkout* sudah bisa menghasilkan URL Virtual Account/QRIS secara *live* menggunakan kredensial Sandbox Midtrans.
   - Status pesanan disimpan ke `LocalStorage` (`sorae_orders`) setelah Snap API mengeluarkan callback `onSuccess` atau `onPending`.
3. **End-to-End Admin Simulation (E2E):** 
   - Admin Dashboard tidak lagi berisi data statis. Tabel Pesanan (`Orders.jsx`) dinamis merender pesanan baru.
   - Admin bisa menyimulasikan alur logistik dengan memasukkan Nomor Resi pengiriman.
   - Tabel Pelanggan (`Customers.jsx`) secara otomatis mengakumulasi LTV (Life-Time Value) tiap pembeli menggunakan metode agregasi email dari data `sorae_orders`.

## 5. What Is Planned (Next Action Items)
AI Agent berikutnya diharapkan melanjutkan estafet pengerjaan berikut secara sistematis:

1. **Phase 1: Backend / Database Migration (Supabase)**
   - Buat skema tabel SQL di Supabase (`users`, `products`, `orders`, `order_items`).
   - Ganti implementasi baca/tulis `localStorage.getItem('sorae_orders')` dengan Supabase Client API. 
   - Pindahkan logika sinkronisasi status pembayaran dari *frontend polling* menjadi *Midtrans Webhook* yang meng-hit Supabase Edge Functions / Backend API untuk keamanan mutlak.
2. **Phase 2: Logistics & Ongkir Otomatis**
   - Integrasikan RajaOngkir API di dalam `Checkout.jsx`.
   - Gunakan data Kota/Kecamatan *dropdown* (bukan *free-text*) agar perhitungan ongkos kirim otomatis ditambahkan ke total transaksi sebelum memanggil `create-transaction` Midtrans.
3. **Phase 3: Marketing & Analytics CAPI**
   - Implementasikan *Meta Conversions API (CAPI)* untuk melempar *event* "Purchase" langsung dari server/Edge Functions setiap kali transaksi Midtrans berhasil, menghindari blokir dari *Ad-Blocker/iOS 14*.

## 6. Confidential Data & Development Secrets
Berikut adalah *notes* rahasia dan kredensial *development* yang aktif saat ini. **(MOHON UNTUK TIDAK DI-PUBLISH KE REPOSITORY PUBLIK TANPA `.gitignore`)**

### A. API Keys & Credentials (Sandbox Mode)
1. **Midtrans Payment Gateway (Environment: Sandbox)**
   - **Client Key:** `SB-Mid-client-ehZ6wDaw1YRKFsQ8` (Digunakan di `vite.config.js` dan di-inject ke `index.html` via script tag).
   - **Server Key:** `SB-Mid-server-bBGHI9WCdK8zfQrzO_YKE1sL` (SANGAT RAHASIA: Hanya boleh dibaca oleh backend/`vite.config.js` via `process.env`. Dilarang keras dipanggil dari komponen React frontend).
   - *Catatan Testing:* Untuk mensimulasikan pembayaran yang sukses, buka Midtrans Simulator (https://simulator.sandbox.midtrans.com/bca/va/index) di tab terpisah dan masukkan nomor Virtual Account BCA yang didapat dari Pop-up Snap.
2. **Supabase (To Be Defined)**
   - Project URL: *[TBA]*
   - Anon Key: *[TBA]*
3. **RajaOngkir (To Be Defined)**
   - API Key: *[TBA]*

### B. Core UI/UX & Styling Guidelines
- **Primary Brand Color (Navy/Dark Blue):** `#0A0F2C`. Digunakan secara konsisten untuk tombol utama, header *Cart Drawer*, dan navigasi *Admin*. Dilarang menggunakan biru standar Tailwind (`bg-blue-600`) untuk elemen kritikal branding.
- **Micro-interactions:** Setiap *hover* pada kartu produk atau tombol harus memiliki transisi halus (`transition hover:bg-black` atau `framer-motion`). Jangan membuat elemen yang kaku.

### C. Deep Architecture Notes (Do Not Break)
1. **CartDrawer Mutex:** Halaman keranjang *standalone* (`/cart`) sudah sepenuhnya dihilangkan. Jika Anda membuat fitur yang mengarah ke keranjang (misal dari halaman *ProductDetail*), panggil `setIsCartOpen(true)` dari `CartContext`, JANGAN me-routing user menggunakan `useNavigate('/cart')`.
2. **Admin Routing Protection:** Navbar dan Footer disembunyikan menggunakan fungsi `startsWith('/admin')` di `App.jsx`. Jika ada modul tambahan (seperti dashboard HR/Affiliate), pastikan menggunakan struktur nested route di bawah `/admin` agar tidak bertabrakan dengan Navbar publik.
3. **The LocalStorage Hack (`sorae_orders`):** Saat ini `Checkout.jsx` langsung menyimpan objek pesanan lengkap (Customer, Items, Total, Status: 'paid'/'shipped') ke dalam string JSON di memori browser. Ketika melakukan migrasi ke Supabase, **HAPUS** logika `localStorage.setItem` ini dan gantikan dengan asinkronus `await supabase.from('orders').insert(...)`.
4. **Checkout Form State:** Objek `form` di `Checkout.jsx` terikat pada fungsi simulasi `🧪 Isi Data (Testing)`. Jangan hapus fungsi autofill ini sampai proyek benar-benar siap naik ke *Production*, karena ini sangat mempercepat workflow *testing* agen AI dan developer.

---
*Dokumen ini merupakan "Buku Panduan Teknis (The Matrix)" proyek SORAE, dirancang untuk memudahkan transisi antar sesi Artificial Intelligence.*
