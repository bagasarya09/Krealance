import React, { useLayoutEffect } from 'react';
import Footer from '../components/layout/Footer';
import Portfolio from '../components/portfolio/Portfolio';
import '../styles/works-page.css';

export default function WorksPage() {
  useLayoutEffect(() => {
    const originalTitle = document.title;
    document.title = 'Karya Kami — Krealance';
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => {
      document.title = originalTitle;
    };
  }, []);

  function goBack(event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    const previousPage = window.history.state?.krealanceWorksFrom;
    if (previousPage && window.history.length > 1) {
      event.preventDefault();
      window.history.back();
    }
  }

  return (
    <div className="page portfolio-page">
      <main>
        <div className="container">
          <a className="button outline works-back" href="#case-studies" onClick={goBack}>
            <span aria-hidden="true">←</span> Kembali
          </a>
        </div>
        <Portfolio />
      </main>
      <Footer
        backToTopHref="#/karya"
        onBackToTop={(event) => {
          event.preventDefault();
          const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' });
        }}
      />
    </div>
  );
}
