import React, { useRef, useState, useSyncExternalStore } from 'react';
import Hero from './components/home/Hero';
import Services from './components/home/Services';
import Portfolio from './components/portfolio/Portfolio';
import Pricing from './components/pricing/Pricing';
import Contact from './components/contact/Contact';
import Footer from './components/layout/Footer';
import Notice from './components/common/Notice';
import useProjectBrief from './hooks/useProjectBrief';
import { contact } from './config/contact';
import usePageMotion from './hooks/usePageMotion';
import WorksPage from './pages/WorksPage';

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pageRef = useRef(null);
  const brief = useProjectBrief();
  usePageMotion(pageRef);
  return (
    <div className="page" ref={pageRef}>
      <div className="motion-panel motion-panel--hero">
        <div className="motion-panel-content">
          <Hero menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>
      </div>
      <div className="motion-panel motion-panel--services">
        <div className="motion-panel-content">
          <Services />
        </div>
      </div>
      <div className="motion-panel motion-panel--portfolio">
        <Portfolio preview />
      </div>
      <Pricing
        choosePackage={brief.choosePackage}
        chooseCustomService={brief.chooseCustomService}
      />
      <Notice message={brief.notice} onClose={brief.clearNotice} />
      <Contact contact={contact} whatsappLink={brief.whatsappLink} form={brief.form} />
      <Footer onNavigate={() => setMenuOpen(false)} />
    </div>
  );
}

function subscribeToPageChange(callback) {
  function onHashChange(event) {
    const previous = new URL(event.oldURL);
    const current = new URL(event.newURL);
    if (
      current.hash === '#/karya' &&
      previous.hash !== '#/karya' &&
      previous.origin === current.origin &&
      previous.pathname === current.pathname &&
      previous.search === current.search
    ) {
      // Record only navigation inside this app; a directly opened page uses the fallback link.
      window.history.replaceState(
        { ...window.history.state, krealanceWorksFrom: previous.hash || '#home' },
        '',
      );
    }
    callback();
  }
  window.addEventListener('hashchange', onHashChange);
  return () => window.removeEventListener('hashchange', onHashChange);
}

export default function App() {
  // A hash route also works on static hosting without server rewrite rules.
  const isWorksPage = useSyncExternalStore(
    subscribeToPageChange,
    () => window.location.hash === '#/karya',
    () => false,
  );

  return isWorksPage ? <WorksPage /> : <HomePage />;
}
