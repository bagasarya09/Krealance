import React from 'react';
import { serviceOverviews } from '../../data/packages';
import { money } from '../../utils/currency';

export default function PricingOverview({ setTab }) {
  return (
    <div className="package-grid">
      {serviceOverviews.map(({ name, title, price, description, scope }) => {
        const isGraphic = name === 'Desain Grafis';
        return (
          <article className="price-card overview" key={name}>
            <span className="eyebrow">{name}</span>
            <h3>{title}</h3>
            <div className="price">
              {!isGraphic && 'Mulai '}
              {money(price)}
              {isGraphic && <small>/desain</small>}
            </div>
            <p>{description}</p>
            <p className="overview-scope">{scope}</p>
            <button className="button outline" onClick={() => setTab(name)}>
              Lihat {isGraphic ? 'Pilihan Desain' : 'Paket'} <span>→</span>
            </button>
          </article>
        );
      })}
    </div>
  );
}
