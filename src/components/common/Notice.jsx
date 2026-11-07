import React from 'react';

export default function Notice({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="container notice" role="status">
      {message}
      <button className="notice-close" aria-label="Tutup pemberitahuan" onClick={onClose}>
        ×
      </button>
    </div>
  );
}
