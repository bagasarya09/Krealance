import React from 'react';
import { uiPackages } from '../../data/packages';
import PriceCard from './PriceCard';

export default function UiPackages({ platform, setPlatform, choosePackage }) {
  return (
    <>
      <div className="sub-options" aria-label="Platform UI/UX">
        {Object.keys(uiPackages).map((option) => (
          <button
            key={option}
            aria-pressed={platform === option}
            onClick={() => setPlatform(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="package-grid">
        {uiPackages[platform].map((packageOption, index) => (
          <PriceCard
            key={platform + packageOption.name}
            group={'UI/UX ' + platform}
            entry={packageOption}
            index={index}
            choosePackage={choosePackage}
            selection={{ service: 'uiux', type: platform, packageName: packageOption.name }}
          />
        ))}
      </div>
      <div className="package-terms">
        <strong>Desain Figma untuk satu platform dan satu ukuran tampilan.</strong>
        <p>
          File Figma yang dapat diedit dan ekspor PNG termasuk. Materi dan kebutuhan dari klien.
          Kondisi kosong, error, atau berhasil dihitung dalam jumlah layar. Starter hanya untuk
          layar sederhana dalam satu alur, bukan lima halaman website panjang.
        </p>
        <p>
          Belum termasuk pengembangan aplikasi/website, riset pengguna, atau pengujian pengguna.
          Dashboard kompleks dan percabangan khusus melalui penawaran. Revisi ringan dikumpulkan per
          putaran, tanpa perubahan konsep.
        </p>
      </div>
    </>
  );
}
