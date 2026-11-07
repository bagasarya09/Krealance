// Isi kontak Anda di sini. Nomor WA: kode negara tanpa tanda +, spasi, atau awalan 0.
export const contact = { whatsapp: '62895703101140', email: 'krealance@gmail.com' };
export const scopes = [
  'Portofolio Web',
  'Landing Page',
  'E-Commerce',
  'Company Profile',
  'Desain UI/UX (Web / Mobile)',
  'Desain Grafis (Banner / Poster)',
  'Kebutuhan Lainnya',
  'Fitur / Desain Khusus',
];
export function buildMessage({ name, email, scope, packageName, budget, message }) {
  return `Halo Krealance, saya ingin konsultasi mengenai layanan Krealance.\n\nNama: ${name}\nEmail/WhatsApp: ${email}\nKebutuhan proyek: ${scope}\nPaket: ${packageName || 'Belum dipilih'}\nPerkiraan anggaran: ${budget}\nTujuan proyek & target waktu:\n${message || 'Belum ditentukan'}\n\nMohon informasi lebih lanjut. Terima kasih.`;
}
