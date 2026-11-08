import React from 'react';
export default function Footer({ onNavigate, backToTopHref = '#home', onBackToTop = onNavigate }) {
  return (
    <footer className="container">
      <a className="brand" href="#home" onClick={onNavigate}>
        <span className="logo">{'✧'}</span>
        {'Krealance'}
      </a>
      <span>{'Studio Kreatif Digital · Indonesia & Internasional'}</span>
      <a href={backToTopHref} onClick={onBackToTop}>
        {'Kembali ke atas ↑'}
      </a>
    </footer>
  );
}
