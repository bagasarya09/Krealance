import React from 'react';
import { websitePackages } from '../../data/packages';
import WebsitePriceCard from './WebsitePriceCard';
import '../../styles/website-pricing.css';

export default function WebsitePackages({ website, setWebsite, choosePackage }) {
  return (
    <>
      <div className="sub-options" aria-label="Jenis website">
        {Object.keys(websitePackages).map((w) => (
          <button key={w} aria-pressed={website === w} onClick={() => setWebsite(w)}>
            {w}
          </button>
        ))}
      </div>
      <div className="package-grid">
        {websitePackages[website].map((packageOption, index) => (
          <WebsitePriceCard
            key={website + packageOption.name}
            group={website}
            entry={packageOption}
            index={index}
            choosePackage={choosePackage}
          />
        ))}
      </div>
      <div className="package-terms">
        <strong>Ketentuan domain, hosting, dan integrasi.</strong>
        <p>
          Domain dan hosting mengikuti manfaat yang tercantum atau diwarisi pada setiap paket. Paket
          yang mencakup keduanya termasuk domain dan hosting 1 tahun. Pilihan domain reguler, batas
          biaya, dan kapasitas hosting mengikuti kesepakatan. Domain premium dan kapasitas tambahan
          melalui penawaran. Perpanjangan tahun berikutnya dikenakan biaya sesuai layanan yang
          dipilih.
        </p>
        <p>
          Teks dan gambar dari klien. Revisi berupa kumpulan masukan dalam cakupan awal. Integrasi
          menggunakan sistem yang mendukung; biaya transaksi, lisensi, dan layanan pihak ketiga
          terpisah. Bug dalam cakupan diperbaiki selama masa garansi yang disepakati.
        </p>
      </div>
    </>
  );
}
