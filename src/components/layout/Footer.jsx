import React from 'react';
export default function Footer({ onNavigate }) {
  return (
    <footer className="container">
      <a className="brand" href="#home" onClick={onNavigate}>
        <span className="logo">{'✧'}</span>
        {'Krealance'}
      </a>
      <span>{'Studio Kreatif Digital · Indonesia & Internasional'}</span>
      <a href="#home" onClick={onNavigate}>
        {'Kembali ke atas ↑'}
      </a>
    </footer>
  );
}
