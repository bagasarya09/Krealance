import React from 'react';
export default function Footer({ onNavigate, backToTopHref = '#home' }) {
  function backToTop(event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    onNavigate?.(event);
    // Avoid hashchange and anchor-focus handlers interrupting the smooth scroll.
    if (window.location.hash !== backToTopHref) {
      window.history.pushState(null, '', backToTopHref);
    }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' });
  }

  return (
    <footer className="container">
      <a className="brand" href="#home" onClick={onNavigate}>
        <span className="logo">{'✧'}</span>
        {'Krealance'}
      </a>
      <span>{'Studio Kreatif Digital · Indonesia & Internasional'}</span>
      <a href={backToTopHref} onClick={backToTop} data-scroll-to-top="">
        {'Kembali ke atas ↑'}
      </a>
    </footer>
  );
}
