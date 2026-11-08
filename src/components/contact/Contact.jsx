import React from 'react';
import ProjectForm from './ProjectForm';
export default function Contact({ contact, whatsappLink, form }) {
  return (
    <section className="section contact container" id="estimator">
      <div className="contact-grid">
        <div>
          <h2>{'Wujudkan Ide Digital Anda Bersama Kami.'}</h2>
          <p className="intro">
            {
              'Ceritakan tujuan bisnis, referensi desain, atau target peluncuran Anda. Kami menyediakan konsultasi gratis, proposal tertulis yang transparan, dan estimasi tahapan pengerjaan yang jelas.'
            }
          </p>
          <a
            className="contact-link"
            target="_blank"
            rel="noopener"
            href={whatsappLink}
            aria-disabled={!contact.whatsapp}
          >
            <span className="icon">{'☏'}</span>
            <div>
              {'Hubungi melalui WhatsApp'}
              <small>
                {contact.whatsapp ? '+' + contact.whatsapp : 'Nomor akan segera tersedia'}
              </small>
            </div>
            <span style={{ marginLeft: 'auto' }}>{'↗'}</span>
          </a>
          <a
            className="contact-link"
            href={contact.email ? 'mailto:' + contact.email : undefined}
            aria-disabled={!contact.email}
          >
            <span className="icon">{'✉'}</span>
            <div>
              {'Kirim Email'}
              <small>{contact.email || 'Email akan segera tersedia'}</small>
            </div>
            <span style={{ marginLeft: 'auto' }}>{'↗'}</span>
          </a>
        </div>
        <ProjectForm {...form} />
      </div>
    </section>
  );
}
