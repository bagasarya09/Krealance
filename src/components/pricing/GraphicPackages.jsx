import React from 'react';
import { graphicPackages } from '../../data/packages';
import PriceCard from './PriceCard';

export default function GraphicPackages({ choosePackage }) {
  return (
    <>
      <div className="package-grid graphic-grid">
        {graphicPackages.map((packageOption) => (
          <PriceCard
            key={packageOption.name}
            group="Desain Grafis"
            entry={packageOption}
            graphic
            choosePackage={choosePackage}
            selection={{ service: 'graphic', type: packageOption.name }}
          />
        ))}
      </div>
      <div className="package-terms">
        <p>
          Ukuran tambahan, perubahan konsep, berkas sumber, atau kebutuhan cetak dibicarakan melalui
          konsultasi.
        </p>
      </div>
    </>
  );
}
