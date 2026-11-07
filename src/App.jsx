import React, { useState } from 'react';
import Hero from './components/home/Hero';
import Services from './components/home/Services';
import Portfolio from './components/portfolio/Portfolio';
import Pricing from './components/pricing/Pricing';
import Contact from './components/contact/Contact';
import Footer from './components/layout/Footer';
import Notice from './components/common/Notice';
import useProjectBrief from './hooks/useProjectBrief';
import { contact } from './config/contact';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const brief = useProjectBrief();
  return (
    <div className="page">
      <Hero menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Services />
      <Portfolio />
      <Pricing choosePackage={brief.choosePackage} />
      <Notice message={brief.notice} onClose={brief.clearNotice} />
      <Contact
        contact={contact}
        whatsappLink={brief.whatsappLink}
        selectedPackage={brief.selectedPackage}
        clearSelectedPackage={brief.clearSelectedPackage}
        sendBrief={brief.sendBrief}
        scopeIndex={brief.scopeIndex}
        setScopeIndex={brief.setScopeIndex}
        budget={brief.budget}
        setBudget={brief.setBudget}
      />
      <Footer onNavigate={() => setMenuOpen(false)} />
    </div>
  );
}
