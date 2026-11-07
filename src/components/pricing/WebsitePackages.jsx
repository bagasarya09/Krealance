import React from 'react';
import { websitePackages } from '../../data/packages';
import PriceCard from './PriceCard';

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
          <PriceCard
            key={website + packageOption.name}
            group={website}
            entry={packageOption}
            index={index}
            choosePackage={choosePackage}
          />
        ))}
      </div>
      <div className="package-terms">
        <strong>Termasuk domain & hosting tahun pertama.</strong>
        <p>
          Domain reguler sesuai pilihan dan batas biaya yang disepakati; domain premium dan
          kapasitas tambahan melalui penawaran. Perpanjangan tahun berikutnya dikenakan biaya sesuai
          layanan yang dipilih.
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
