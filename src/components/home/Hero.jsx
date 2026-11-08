import React from 'react';
import Header from '../layout/Header';
import TechStack from './TechStack';
export default function Hero({ menuOpen, setMenuOpen }) {
  return (
    <div className="hero-shell" id="home">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="hero container">
        <div>
          <h1>{'Kami Bangun Solusi Digital yang Siap Berkembang.'}</h1>
          <p>
            {
              'Pengembangan website berstandar unggulan, desain UI/UX yang mudah digunakan, dan optimalisasi performa untuk merek serta startup yang terus berkembang.'
            }
          </p>
          <div className="actions">
            <a href="#case-studies" className="button primary" onClick={() => setMenuOpen(false)}>
              {'Lihat Portofolio '}
              <span>{'↗'}</span>
            </a>
            <a href="#estimator" className="button white" onClick={() => setMenuOpen(false)}>
              {'Mulai Proyek '}
              <span>{'→'}</span>
            </a>
          </div>
          <TechStack />
        </div>
        <div className="visual" aria-label="Ilustrasi antarmuka produk digital">
          <div className="browser">
            <div className="browser-bar">
              <i></i>
              <i></i>
              <i></i>
              <div className="address">{'krealance.studio / ide-berikutnya'}</div>
            </div>
            <div className="mock-nav">
              <b>{'✧ krealance'}</b>
              <span className="mock-link">{'Rancang Bangun Luncurkan ↗'}</span>
            </div>
            <div className="mock-body">
              <small>{'STUDIO KREATIF DIGITAL'}</small>
              <h3>
                {'Ide besar.'}
                <br />
                {'Dirancang sepenuh hati.'}
              </h3>
              <p>
                {'Antarmuka yang matang. Performa yang andal.'}
                <br />
                {'Siap mendukung langkah Anda berikutnya.'}
              </p>
              <span className="mock-cta">{'Jelajahi peluangnya ↗'}</span>
            </div>
            <div className="mock-grid">
              <div className="mock-tile">
                <strong>{'01'}</strong>
                {'Pengembangan'}
                <br />
                {'Website Modern'}
              </div>
              <div className="mock-tile">
                <strong>{'02'}</strong>
                {'UI/UX &'}
                <br />
                {'Sistem Desain'}
              </div>
              <div className="mock-tile">
                <strong>{'03'}</strong>
                {'Performa'}
                <br />
                {'yang Andal'}
              </div>
            </div>
          </div>
          <div className="float-card">
            <div className="code-title">{'⌘  krealance.config.ts'}</div>
            <code>
              <span>{'const'}</span>
              {' krealance = {'}
              <br />
              {'  what: '}
              <span>{'"Studio Kreatif Digital"'}</span>
              {','}
              <br />
              {'  status: '}
              <span>{'"Siap diluncurkan 🚀"'}</span>
              <br />
              {'};'}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
