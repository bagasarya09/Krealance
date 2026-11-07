import React from 'react';
import { scopes } from '../../config/contact';
import { budgetOptions } from '../../utils/projectBrief';

export default function ProjectForm({
  clearSelectedPackage,
  selectedPackage,
  sendBrief,
  scopeIndex,
  setScopeIndex,
  budget,
  setBudget,
}) {
  return (
    <div className="form-card">
      {selectedPackage && (
        <p className="selection-note">
          Pilihan Anda:{' '}
          <strong>
            {selectedPackage.service} — {selectedPackage.name}
          </strong>
        </p>
      )}
      <form id="project-form" onSubmit={sendBrief}>
        <div className="form-row">
          <div>
            <label htmlFor="name">{'Nama Anda *'}</label>
            <input
              id="name"
              name="name"
              placeholder="Contoh: Andi Pratama"
              required
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="email">{'Email Kerja / WhatsApp *'}</label>
            <input
              id="email"
              name="email"
              placeholder="andi@perusahaan.com atau +62 812..."
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="scope">{'Kebutuhan Proyek'}</label>
          <select
            id="scope"
            name="scope"
            value={scopeIndex}
            onChange={(e) => {
              setScopeIndex(e.target.value);
              clearSelectedPackage();
            }}
          >
            {scopes.map((s, i) => (
              <option key={s} value={String(i)}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <fieldset>
          <legend>Perkiraan Anggaran</legend>
          <div className="budget-grid">
            {budgetOptions.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="budget"
                  value={option}
                  checked={budget === option}
                  onChange={(event) => setBudget(event.target.value)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor="message">{'Tujuan Proyek & Target Waktu'}</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Ceritakan secara singkat tujuan proyek, referensi merek, kebutuhan fitur, atau target peluncuran Anda..."
          ></textarea>
        </div>
        <div className="form-footer">
          <p>{'Konsultasi gratis & penawaran transparan tanpa biaya tersembunyi.'}</p>
          <button className="button primary" type="submit">
            Konsultasi via WhatsApp <span>↗</span>
          </button>
        </div>
      </form>
    </div>
  );
}
