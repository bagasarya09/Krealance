import React from 'react';
import { money } from '../../utils/currency';

export default function WebsitePriceCard({ group, entry, index, choosePackage }) {
  const { name, price, audience, features } = entry;
  const isPopular = index === 1;

  return (
    <article className={`price-card website-price-card${isPopular ? ' popular' : ''}`}>
      <span className="overline">{group}</span>
      <h3>{name}</h3>
      <p className="package-audience">
        <strong>Cocok untuk:</strong> {audience}
      </p>
      <div className="price">Mulai {money(price)}</div>
      <p className="timing">Sekali bayar · sesuai cakupan</p>
      <ul>
        {features.map((feature) => (
          <li key={feature}>
            <span aria-hidden="true">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={`button ${isPopular ? 'primary' : 'outline'}`}
        onClick={() => choosePackage({ service: 'website', type: group, packageName: name })}
      >
        Pilih Paket <span aria-hidden="true">↗</span>
      </button>
    </article>
  );
}
