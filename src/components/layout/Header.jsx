import React from 'react';

export default function Header({ menuOpen, setMenuOpen, worksPage = false }) {
  return (
    <header className="container">
      <a
        className="brand"
        href="#home"
        aria-label="Beranda Krealance"
        onClick={() => setMenuOpen(false)}
      >
        <span className="logo"></span>
        {'Krealance'}
      </a>
      <nav aria-label="Navigasi utama" className={menuOpen ? 'open' : ''}>
        <a
          href="#home"
          className={worksPage ? undefined : 'active'}
          onClick={() => setMenuOpen(false)}
        >
          {'Beranda'}
        </a>
        <a href="#services" onClick={() => setMenuOpen(false)}>
          {'Layanan'}
        </a>
        <a
          href={worksPage ? '#/karya' : '#case-studies'}
          className={worksPage ? 'active' : undefined}
          aria-current={worksPage ? 'page' : undefined}
          onClick={() => setMenuOpen(false)}
        >
          {'Karya Kami'}
        </a>
        <a href="#pricing" onClick={() => setMenuOpen(false)}>
          {'Harga'}
        </a>
        <a href="#estimator" onClick={() => setMenuOpen(false)}>
          {'Kontak'}
        </a>
      </nav>
      <a className="button dark header-cta" href="#estimator" onClick={() => setMenuOpen(false)}>
        {'Mari Diskusi '}
        <span>{'↗'}</span>
      </a>
      <button
        className="menu-toggle"
        aria-label="Buka menu"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
      >
        {'☰'}
      </button>
    </header>
  );
}
