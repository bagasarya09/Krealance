import React from 'react';

export default function CustomService({ onConsult }) {
  return (
    <div className="custom-service">
      <div>
        <h3>Butuh Fitur atau Desain Khusus?</h3>
        <p>
          Ceritakan kebutuhan di luar paket, atau diskusikan pilihan yang paling cocok. Kami akan
          memberikan estimasi biaya dan waktu pengerjaan sesuai cakupan kebutuhan Anda.
        </p>
      </div>
      <button className="button primary" onClick={onConsult}>
        Diskusikan via WhatsApp <span>↗</span>
      </button>
    </div>
  );
}
