// Harga dalam rupiah. Perbarui cakupan dan harga paket di file ini.

export const websitePackages = {
  'Portofolio Web': [
    {
      name: 'Starter',
      price: 349000,
      features: [
        'Personal Profile',
        'Domain',
        'About Me Section',
        'Project Showcase',
        'Skill & Technologis',
        'Experience / Education',
        'Contact Section',
        'Responsive Design',
        'Social Media Integration',
        'Free Hosting',
      ],
    },
    {
      name: 'Pro',
      price: 849000,
      features: [
        'Semua Benefit Starter',
        'WhatsApp Button',
        'Basic SEO',
        'Custom Design',
        'Admin Dashboard',
        'Manage Project & Content',
        'Free Hosting',
      ],
    },
    {
      name: 'Premium',
      price: 1500000,
      features: [
        'Semua Benefit Pro',
        'Bebas Request Jumlah Halaman',
        'Admin Dashboard',
        '10x Revisi',
        'Admin Dashboard',
        'Manage Project & Content',
        'Custom Domain',
        'Custom Feature Sesuai Kebutuhan',
        'Free Hosting',
      ],
    },
  ],
  'Landing Page': [
    {
      name: 'Basic',
      price: 849000,
      features: [
        '1 Halaman Panjang',
        'Responsive Design',
        'Custom Design',
        'CTA Button',
        'WhatsApp Button',
        'Basic SEO',
        'Social Media Integration',
        'Free Hosting',
        'Revisi 2x',
      ],
    },
    {
      name: 'Profesional',
      price: 2500000,
      features: [
        'Semua Benefit di Basic',
        'Custom Domain',
        'SEO Integration',
        'Google Analytics',
        'Interactive Animation',
        'Contact Form',
        'Google Maps Integration',
        'Domain',
        'Speed Optimization',
        'Revisi 5x',
      ],
    },
    {
      name: 'Business',
      price: 4000000,
      features: [
        'Semua Benefit di Professional',
        'Bebas Request Halaman',
        'Admin Dashboard',
        'Dynamic Content',
        'Custome Feature',
        'Advanced SEO',
        'Analytic & Tracking',
        'Payment Integration',
        'Revisi 10x',
      ],
    },
  ],
  'E-Commerce': [
    {
      name: 'Starter',
      price: 3000000,
      features: [
        'Custom Design',
        'Product Catalog',
        'Product Detail',
        'Shopping Cart',
        'Checkout System',
        'Payment Integration',
        'Admin Dashboard',
        'Product Management',
        'Responsive Design',
        'Basic SEO',
        'Free Hosting',
      ],
    },
    {
      name: 'Growth',
      price: 12000000,
      features: [
        'Semua Benefit di Starter',
        'Kelola Produck & Stok',
        'Custom Domain',
        'Search & Advanced Filter',
        'Keranjang & Checkout ',
        'Payment Gateway',
        'Promo & Voucher',
        'Kategori & Varian Product',
        'Laporan Penjualan',
      ],
    },
    {
      name: 'Enterprise',
      price: 25000000,
      features: [
        'Semua Benefit di Growth',
        'Multi-Level Inventory',
        'Multi Outlet / Multi Cabang',
        'Advanced Promo & Voucher',
        'Custom Payment Integration',
        'Shipping & Courier Integration',
      ],
    },
  ],
  'Company Profile': [
    {
      name: 'Basic',
      price: 2000000,
      features: [
        '4 halaman: Beranda, Tentang, Layanan, Kontak',
        'Desain responsif dan kontak WhatsApp',
        '1 kali revisi ringan',
      ],
    },
    {
      name: 'Business',
      price: 5500000,
      features: [
        'Hingga 10 halaman',
        'CMS, berita/artikel, formulir penawaran',
        '2 kali revisi ringan',
      ],
    },
    {
      name: 'Corporate',
      price: 9000000,
      features: [
        'Hingga 15 halaman dan dua bahasa',
        'Struktur layanan/divisi dan pelatihan CMS',
        '3 kali revisi ringan',
      ],
    },
  ],
};

export const uiPackages = [
  {
    name: 'Starter',
    price: 100000,
    features: ['5 layar sederhana dalam satu alur', 'Prototipe klik dasar', '1 kali revisi ringan'],
  },
  {
    name: 'Pro',
    price: 350000,
    features: [
      'Hingga 10 layar ringan–menengah',
      'Beberapa alur terhubung dan prototipe dasar',
      '2 kali revisi ringan',
    ],
  },
  {
    name: 'Premium',
    price: 750000,
    features: [
      'Hingga 20 layar ringan–menengah',
      'Komponen bersama dan prototipe menyeluruh',
      '3 kali revisi ringan',
    ],
  },
];

export const graphicPackages = [
  {
    name: 'Banner',
    price: 40000,
    features: [
      '1 desain dengan 1 ukuran',
      '1 kali revisi ringan',
      'Teks, logo, dan materi utama dari klien',
      'Hasil akhir PNG/JPG siap digunakan',
    ],
  },
  {
    name: 'Poster',
    price: 40000,
    features: [
      '1 desain dengan 1 ukuran',
      '1 kali revisi ringan',
      'Teks, logo, dan materi utama dari klien',
      'Hasil akhir PNG/JPG siap digunakan',
    ],
  },
];

function getStartingPackage(packages) {
  return packages.reduce((lowest, current) => (current.price < lowest.price ? current : lowest));
}

// Ringkasan mengikuti harga paket, sehingga tidak perlu diperbarui secara terpisah.
const websiteOffers = Object.entries(websitePackages).flatMap(([service, packages]) =>
  packages.map((packageOption) => ({ ...packageOption, service })),
);
const startingWebsitePackage = getStartingPackage(websiteOffers);

export const serviceOverviews = [
  {
    name: 'Website',
    title: 'Wujudkan website Anda',
    price: startingWebsitePackage.price,
    description: 'Website siap digunakan untuk profil pribadi atau promosi bisnis.',
    scope: `${startingWebsitePackage.service} ${startingWebsitePackage.name} · domain & hosting 1 tahun`,
  },
  {
    name: 'Desain UI/UX',
    title: 'Rancang pengalaman digital',
    price: getStartingPackage(uiPackages).price,
    description: 'Rancang antarmuka website atau aplikasi mobile di Figma.',
    scope: '5 layar sederhana · satu alur · prototipe klik dasar',
  },
  {
    name: 'Desain Grafis',
    title: 'Desain untuk pesan Anda',
    price: getStartingPackage(graphicPackages).price,
    description: 'Sampaikan informasi dengan banner atau poster.',
    scope: '1 desain · 1 ukuran · 1 kali revisi ringan',
  },
];
