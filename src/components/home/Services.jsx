import React from 'react';
export default function Services() {
  return (
    <section className="section container" id="services">
      <div className="section-head">
        <h2>
          {'Layanan Digital untuk'}
          <br />
          {'Pertumbuhan Bisnis Anda'}
        </h2>
        <p>
          {
            'Kami memadukan keahlian teknologi dan ketelitian desain untuk membangun antarmuka yang kompetitif dan memperkuat citra bisnis Anda.'
          }
        </p>
      </div>
      <div className="services">
        <article>
          <div className="service-icon">{'⌘'}</div>
          <h3>{'Pengembangan Website Khusus'}</h3>
          <p>
            {
              'Arsitektur antarmuka yang rapi, mudah dikembangkan, dan aplikasi web berperforma tinggi dengan Next.js, React, Tailwind, serta infrastruktur yang andal.'
            }
          </p>
          <div className="tags">
            <span>{'Portofolio Web'}</span>
            <span>{'Landing Page'}</span>
            <span>{'E-Commerce'}</span>
            <span>{'Company Profile'}</span>
          </div>
        </article>
        <article>
          <div className="service-icon">{'▱'}</div>
          <h3>{'UI/UX & Sistem Desain'}</h3>
          <p>
            {
              'Antarmuka yang berfokus pada pengguna, sistem desain yang konsisten, interaksi kecil, animasi mode gelap, serta desain system yang presisi dan mudah dikembangkan.'
            }
          </p>
          <div className="tags">
            <span>{'Design Website'}</span>
            <span>{'Design Desktop'}</span>
            <span>{'Design Mobile'}</span>
          </div>
        </article>
        <article>
          <div className="service-icon">✧</div>
          <h3>Desain Grafis</h3>
          <p>
            Banner dan poster untuk kebutuhan promosi serta informasi. Satu desain, satu ukuran, dan
            satu kali revisi ringan mulai Rp40.000 per desain.
          </p>
          <div className="tags">
            <span>Banner</span>
            <span>Poster</span>
          </div>
        </article>
      </div>
    </section>
  );
}
