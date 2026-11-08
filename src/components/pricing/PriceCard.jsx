import React from 'react';
import { money } from '../../utils/currency';
export default function PriceCard({
  group,
  entry,
  index,
  graphic = false,
  choosePackage,
  selection,
}) {
  const { name, price, features } = entry;
  const isPopular = index === 1 && !graphic;

  return (
    <article className={'price-card ' + (isPopular ? 'popular' : '')}>
      <span className="overline">{group}</span>
      <h3>{name}</h3>
      <div className="price">
        {graphic ? '' : 'Mulai '}
        {money(price)}
      </div>
      <p className="timing">
        {graphic ? 'Per desain · 1 ukuran' : 'Sekali bayar · sesuai cakupan'}
      </p>
      <ul>
        {features.map((feature) => (
          <li key={feature}>
            <span>✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={'button ' + (isPopular ? 'primary' : 'outline')}
        onClick={() => choosePackage(selection ?? { service: group, name })}
      >
        Pilih {graphic ? 'Desain' : 'Paket'} <span>↗</span>
      </button>
    </article>
  );
}
