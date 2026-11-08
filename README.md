# Krealance

Website React.js + Vite, bahasa Indonesia, desain putih–ungu.

## Jalankan

Gunakan Node.js 22.12+ atau versi LTS yang kompatibel dengan Vite.

npm install
npm run dev

## Build

npm run build
npm run preview

## Kontak dan template WhatsApp

Edit `src/config/contact.js`:

- `contact.whatsapp`: nomor tujuan dengan kode negara, misalnya 62812xxxxxxxx, tanpa + atau spasi.
- `contact.email`: alamat email Anda.
- `buildMessage`: template pesan WhatsApp.

Jika nomor WhatsApp belum diisi atau formatnya tidak valid, formulir menampilkan pemberitahuan dan tidak mengarahkan ke nomor lain. Setelah nomor diisi, tombol membuka draf WhatsApp; pengguna tetap menekan Kirim sendiri. Tidak ada backend dan tidak ada penyimpanan data formulir di server.

Formulir menggunakan urutan Nama, WhatsApp / Email, Layanan, Jenis Layanan, Paket, dan Catatan. Pilihan jenis serta paket dibaca langsung dari `websitePackages`, `uiPackages`, dan `graphicPackages`. Nama dan kontak wajib diisi; pilihan turunan wajib hanya saat ditampilkan. Opsi konsultasi tersedia untuk pengguna yang belum menentukan pilihan. Desain grafis menggunakan jenis Banner/Poster sebagai paket, sehingga tidak menampilkan kolom paket terpisah.

`src/utils/projectBrief.js` mengatur identitas layanan, pembacaan data paket, dan validasi pilihan. State menyimpan layanan, jenis, serta nama paket tanpa memasukkan teks harga ke identitasnya. Harga draf WhatsApp dibaca kembali dari data paket yang dipilih. Mengganti layanan atau jenis akan mereset pilihan turunannya. Nama, kontak, dan catatan tetap tersimpan saat memilih kartu paket. Tombol kebutuhan khusus mengikuti konteks tab harga dan menambahkan catatan tanpa menimpa tulisan pengguna. Pilihan layanan tidak menggunakan kolom anggaran.

## Struktur

```text
src/
  main.jsx                  # Entry point React dan import CSS
  App.jsx                   # Susunan halaman dan penghubung antarkomponen
  components/
    common/                 # Pemberitahuan yang dapat digunakan kembali
    layout/                 # Header, navigasi, dan footer
    home/                   # Hero dan daftar layanan
    pricing/                # Tab, kartu, dan panel paket setiap layanan
    portfolio/              # Daftar karya, kartu karya, dan dialog gambar
    contact/                # Informasi kontak dan formulir proyek
  config/
    contact.js              # Kontak dan template WhatsApp
  data/
    packages.js             # Data paket dan ringkasan layanan
    works.js                # Data karya dan kategori portofolio
  hooks/
    useProjectBrief.js       # State formulir, pemilihan paket, draf WhatsApp
  utils/
    currency.js             # Format mata uang rupiah
    projectBrief.js         # Pilihan layanan, pembacaan paket, dan validasi formulir
  styles/
    global.css              # Gaya website dan penyesuaian responsif
    interactions.css        # Efek tombol, hover kartu, dan skeleton shimmer
```

Komponen dikelompokkan berdasarkan fitur. Data konten dipisahkan dari JSX, sedangkan logika konsultasi berada di hook `useProjectBrief`. Setiap komponen menerima props yang dibutuhkan saja.

`components/common/SkeletonImage.jsx` menampilkan skeleton shimmer selama gambar portofolio dimuat, termasuk pada dialog pratinjau. Gambar dari cache langsung ditampilkan, sedangkan gambar yang gagal dimuat menampilkan pesan pengganti. Efek gerak mengikuti preferensi `prefers-reduced-motion`.

Logo sementara berupa teks Krealance. Portofolio berisi satu contoh tampilan; kategori yang belum memiliki karya menampilkan pesan kosong.

## Format kode

Prettier mengatur format JavaScript, JSX, CSS, HTML, JSON, dan Markdown secara konsisten:

```sh
npm run format
npm run format:check
```

Konfigurasi berada di `.prettierrc.json`. Folder `node_modules`, hasil build `dist`, dan lockfile diabaikan formatter.

## Paket layanan terbaru

Bagian harga menggunakan tab Semua, Website, Desain UI/UX, dan Desain Grafis.
Edit `src/data/packages.js` untuk harga dan cakupan paket. Setiap paket menggunakan objek dengan properti `name`, `price`, dan `features`; harga ditulis dalam rupiah. Ringkasan layanan berada pada `serviceOverviews` di file yang sama.

Untuk mengubah harga Portofolio Web, edit properti `price` pada paket Starter, Pro, atau Premium di `websitePackages['Portofolio Web']`. Harga awal pada tab Semua otomatis mengikuti paket termurah dari seluruh jenis website, beserta nama paketnya. Harga awal UI/UX dan desain grafis juga mengikuti paket termurah masing-masing. Pilihan formulir dan harga pada draf WhatsApp membaca data paket yang sama. Tidak perlu mengubah komponen tampilan atau `currency.js` untuk pembaruan harga.
Tampilan dan tab berada di `src/components/pricing/`. `Pricing.jsx` mengatur pilihan tab layanan.

Harga dan cakupan UI/UX dikelompokkan berdasarkan platform di `src/data/packages.js`: `uiPackages['Website']` dan `uiPackages['Aplikasi Mobile']`. Setiap platform mempunyai paket Starter, Pro, dan Premium sendiri. Ubah properti `price` pada platform yang diinginkan; perubahan tersebut tidak memengaruhi platform lainnya. Harga awal pada tab Semua otomatis mengambil harga terendah dari kedua platform. Pemilihan paket ke formulir konsultasi tetap membawa platform dan nama paket, sedangkan harga dibaca dari platform tersebut.

Kartu Website menggunakan `WebsitePriceCard.jsx` secara terpisah; `PriceCard.jsx` tetap digunakan untuk UI/UX dan desain grafis. Properti `audience` pada setiap paket Website berisi penjelasan "Cocok untuk". Seluruh fitur ditampilkan langsung pada masing-masing kartu. Urutkan fitur pada `websitePackages` agar manfaat utama mudah ditemukan. Gaya khusus Website berada di `src/styles/website-pricing.css`.

Manfaat turunan dinyatakan sebagai "Termasuk seluruh manfaat paket [nama paket sebelumnya]". Domain dan hosting mengikuti isi paket atau manfaat yang diwarisi, dengan masa termasuk 1 tahun jika tercantum. Perpanjangan, pilihan domain reguler, dan kapasitas hosting mengikuti kesepakatan; biaya pihak ketiga mengikuti ketentuan di bawah kartu Website.
Pilihan paket muncul pada formulir dan ikut dalam template WhatsApp. Mengganti kebutuhan secara manual menghapus pilihan paket sebelumnya.
Website mencakup domain/hosting tahun pertama dengan batas yang disepakati. Desain tidak termasuk pengembangan.
Perbandingan tabel dihapus, diganti konsultasi fitur/desain khusus sesuai scope.

## Animasi GSAP

Perilaku animasi mengacu pada `references/Krealance_GSAP_React_Preview.html`, sedangkan konten tetap berasal dari komponen dan data proyek. Referensi tidak diimpor ke bundle dan dikecualikan dari pemformatan. Tidak ada bar progres scroll, toolbar pratinjau, atau tombol pengaturan animasi pada website.

- `src/animations/gsap.js` meregistrasikan `useGSAP`, ScrollTrigger, dan SplitText.
- `src/hooks/usePageMotion.js` mengatur pembuka Hero dan reveal. Pada desktop mulai 900px, dua wrapper dipin untuk transisi Hero → Layanan → Karya. Isi wrapper yang dianimasikan; Harga dan Kontak tetap mengalir normal. Section tinggi dapat dibaca melalui scroll biasa sebelum mulai dipin.
- `src/hooks/useContentMotion.js` memberikan transisi pendek pada pergantian tab harga dan filter karya, tanpa membuat ScrollTrigger baru.
- `src/hooks/useWorkDialogMotion.js` mengatur animasi dialog gambar, termasuk Escape, klik latar, tombol tutup, dan pengembalian fokus.
- `src/styles/motion.css` mengatur lapisan dan sudut panel desktop. Hover tombol/kartu tetap dikelola CSS yang sudah ada.

`gsap.matchMedia` menonaktifkan overlap pada layar kecil dan meniadakan animasi besar pada reduced motion. Cleanup menggunakan scope `useGSAP`, `revertOnUpdate`, dan `matchMedia.revert()`. Perubahan ukuran konten, tab/filter, font, dan gambar menjadwalkan refresh pengukuran yang digabung dan ditunda singkat, bukan refresh setiap frame. Anchor memperhitungkan posisi asli section yang dipin.

Pola lifecycle mengikuti dokumentasi resmi [GSAP React](https://github.com/greensock/react), [matchMedia](<https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/>), dan [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/). Pemeriksaan proyek: `npm run build` dan `npm run format:check`.

## Menambah gambar karya

Beranda menampilkan maksimal tiga kartu untuk kategori yang dipilih. Jika jumlah seluruh karya lebih dari tiga, tombol "Lihat Semua Karya" membuka halaman `#/karya`. Halaman tersebut menampilkan seluruh data karya dengan filter kategori dan dialog gambar yang sama, tanpa navbar. Tombol "Kembali" menggunakan riwayat navigasi aplikasi, atau kembali ke bagian Karya di beranda jika halaman dibuka langsung. Rute menggunakan hash sehingga tidak memerlukan library router tambahan atau aturan rewrite pada hosting statis. Implementasi halaman berada di `src/pages/WorksPage.jsx`; `Portfolio.jsx` dipakai bersama dalam mode pratinjau dan penuh.

Edit `src/data/works.js` dan simpan gambar di `public/works/`. Setiap entri memiliki id, title, category, image, alt, description, tags, demo, dan url opsional.
Kategori yang tersedia: Website, Design UI/UX, Design Graphic. Filter Semua menampilkan seluruh entri.
Gambar referensi pengguna dipasang sebagai contoh berlabel `demo: true`; ganti dengan karya asli dan metadata yang benar sebelum digunakan sebagai portofolio nyata. Daftar kosong menampilkan pesan kosong, bukan kartu palsu. Gambar dibuka di dialog dengan tombol tutup, tombol Escape, dan pengembalian fokus.
