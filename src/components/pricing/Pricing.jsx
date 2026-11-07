import React, { useState } from 'react';
import PricingOverview from './PricingOverview';
import WebsitePackages from './WebsitePackages';
import UiPackages from './UiPackages';
import GraphicPackages from './GraphicPackages';
import PricingTabs from './PricingTabs';
import CustomService from './CustomService';

const tabs = ['Semua', 'Website', 'Desain UI/UX', 'Desain Grafis'];
export default function Pricing({ choosePackage }) {
  const [tab, setTab] = useState('Semua');
  const [website, setWebsite] = useState('Portofolio Web');
  const [platform, setPlatform] = useState('Website');

  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <div className="center">
          <h2>Mulai dari Kebutuhan Anda.</h2>
          <p>
            Pilih layanan yang sesuai. Cakupan jelas, harga awal terjangkau, dan konsultasi sebelum
            pengerjaan.
          </p>
        </div>
        <PricingTabs tabs={tabs} activeTab={tab} onChange={setTab} />
        <div id="service-panel" role="tabpanel" aria-labelledby={'tab-' + tabs.indexOf(tab)}>
          {tab === 'Semua' && <PricingOverview setTab={setTab} />}
          {tab === 'Website' && (
            <WebsitePackages
              website={website}
              setWebsite={setWebsite}
              choosePackage={choosePackage}
            />
          )}
          {tab === 'Desain UI/UX' && (
            <UiPackages
              platform={platform}
              setPlatform={setPlatform}
              choosePackage={choosePackage}
            />
          )}
          {tab === 'Desain Grafis' && <GraphicPackages choosePackage={choosePackage} />}
        </div>
        <CustomService choosePackage={choosePackage} />
      </div>
    </section>
  );
}
