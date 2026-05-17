const announcements = [
  '✦ GRATIS VIAL SETIAP PEMBELIAN',
  '✦ PENGIRIMAN KE SELURUH INDONESIA',
  '✦ PARFUM EDP PREMIUM MULAI RP 90.000',
  '✦ BPOM TERDAFTAR & AMAN DIGUNAKAN',
  '✦4.8 ★ DARI 1000+ PELANGGAN PUAS',
];

export default function AnnouncementBar() {
  const text = announcements.join('   ');

  return (
    <div className="bg-[#0A0F2C] text-white text-xs font-bold tracking-widest uppercase overflow-hidden py-2.5 select-none">
      <div className="flex whitespace-nowrap">
        <div className="animate-marquee flex shrink-0">
          {[...announcements, ...announcements].map((item, i) => (
            <span key={i} className="px-10 opacity-90">{item}</span>
          ))}
        </div>
        <div className="animate-marquee flex shrink-0" aria-hidden="true">
          {[...announcements, ...announcements].map((item, i) => (
            <span key={i} className="px-10 opacity-90">{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
