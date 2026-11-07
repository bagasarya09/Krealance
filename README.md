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

Kontak sengaja dikosongkan sesuai permintaan. Sebelum nomor diisi, formulir menampilkan pemberitahuan dan tidak mengarahkan ke nomor lain. Setelah nomor diisi, tombol membuka draf WhatsApp; pengguna tetap menekan Kirim sendiri. Tidak ada backend dan tidak ada penyimpanan data formulir.

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
    contact.js              # Kontak, pilihan kebutuhan, template WhatsApp
  data/
    packages.js             # Data paket dan ringkasan layanan
    works.js                # Data karya dan kategori portofolio
  hooks/
    useProjectBrief.js       # State formulir, pemilihan paket, draf WhatsApp
  utils/
    currency.js             # Format mata uang rupiah
    projectBrief.js         # Pemetaan layanan dan kategori anggaran
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

Untuk mengubah harga Portofolio Web, edit properti `price` pada paket Starter, Pro, atau Premium di `websitePackages['Portofolio Web']`. Harga awal pada tab Semua otomatis mengikuti paket termurah dari seluruh jenis website, beserta nama paketnya. Harga awal UI/UX dan desain grafis juga mengikuti paket termurah masing-masing. Kategori anggaran formulir menyesuaikan harga saat paket dipilih; `projectBrief.js` hanya perlu diubah jika batas kategori anggaran ingin diganti. Tidak perlu mengubah komponen tampilan atau `currency.js` untuk pembaruan harga.
Tampilan dan tab berada di `src/components/pricing/`. `Pricing.jsx` mengatur pilihan tab, sedangkan `PriceCard.jsx` digunakan bersama oleh panel website, UI/UX, dan desain grafis.
Pilihan paket muncul pada formulir dan ikut dalam template WhatsApp. Mengganti kebutuhan secara manual menghapus pilihan paket sebelumnya.
Website mencakup domain/hosting tahun pertama dengan batas yang disepakati. Desain tidak termasuk pengembangan.
Perbandingan tabel dihapus, diganti konsultasi fitur/desain khusus sesuai scope.

## Menambah gambar karya

Edit `src/data/works.js` dan simpan gambar di `public/works/`. Setiap entri memiliki id, title, category, image, alt, description, tags, demo, dan url opsional.
Kategori yang tersedia: Website, Design UI/UX, Design Graphic. Filter Semua menampilkan seluruh entri.
Gambar referensi pengguna dipasang sebagai contoh berlabel `demo: true`; ganti dengan karya asli dan metadata yang benar sebelum digunakan sebagai portofolio nyata. Daftar kosong menampilkan pesan kosong, bukan kartu palsu. Gambar dibuka di dialog dengan tombol tutup, tombol Escape, dan pengembalian fokus.
