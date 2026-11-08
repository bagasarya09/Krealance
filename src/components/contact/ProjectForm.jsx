import React from 'react';
import { money } from '../../utils/currency';
import {
  CONSULTATION,
  CONSULTATION_LABEL,
  serviceOptions,
  getServiceTypes,
  getPackageOptions,
} from '../../utils/projectBrief';

function FieldError({ field, errors }) {
  return errors[field] ? (
    <p className="form-error" id={`${field}-error`}>
      {errors[field]}
    </p>
  ) : null;
}

export default function ProjectForm({
  formRef,
  fields,
  selection,
  errors,
  summary,
  pendingPackageName,
  onFieldChange,
  onServiceChange,
  onTypeChange,
  onPackageChange,
  onSubmit,
}) {
  const typeOptions = getServiceTypes(selection.service);
  const packageOptions = getPackageOptions(selection.service, selection.type);
  const showType = ['website', 'uiux', 'graphic'].includes(selection.service);
  const showPackage =
    ['website', 'uiux'].includes(selection.service) &&
    typeOptions.some((option) => option.value === selection.type);
  const typePlaceholder = {
    website: 'Pilih jenis website',
    uiux: 'Pilih platform desain',
    graphic: 'Pilih jenis desain',
  }[selection.service];
  const errorProps = (field) => ({
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  });

  return (
    <div className="form-card">
      <p className="form-intro" id="consultation-help">
        Pilih layanan dan paket yang Anda minati, atau konsultasikan kebutuhan Anda terlebih dahulu.
      </p>
      {summary && (
        <p className="selection-note">
          Pilihan Anda: <strong>{summary}</strong>
        </p>
      )}
      {pendingPackageName && (
        <p className="form-hint">
          Pilih platform untuk melanjutkan dengan paket {pendingPackageName} dan harga yang sesuai.
        </p>
      )}
      <form
        id="project-form"
        ref={formRef}
        onSubmit={onSubmit}
        noValidate
        aria-describedby="consultation-help"
      >
        {Object.values(errors).some(Boolean) && (
          <p className="form-error" role="alert">
            Periksa kembali kolom yang ditandai sebelum melanjutkan.
          </p>
        )}
        <div className="form-row">
          <div>
            <label htmlFor="name">Nama Anda *</label>
            <input
              id="name"
              name="name"
              placeholder="Contoh: Andi Pratama"
              required
              autoComplete="name"
              value={fields.name}
              onChange={(event) => onFieldChange('name', event.target.value)}
              {...errorProps('name')}
            />
            <FieldError field="name" errors={errors} />
          </div>
          <div>
            <label htmlFor="contact">WhatsApp / Email *</label>
            <input
              id="contact"
              name="contact"
              placeholder="+62 812... atau andi@perusahaan.com"
              required
              value={fields.contact}
              onChange={(event) => onFieldChange('contact', event.target.value)}
              {...errorProps('contact')}
            />
            <FieldError field="contact" errors={errors} />
          </div>
        </div>
        <div>
          <label htmlFor="service">Layanan yang Dibutuhkan *</label>
          <select
            id="service"
            name="service"
            required
            value={selection.service}
            onChange={(event) => onServiceChange(event.target.value)}
            {...errorProps('service')}
          >
            <option value="" disabled>
              Pilih layanan
            </option>
            {serviceOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <FieldError field="service" errors={errors} />
        </div>
        {showType && (
          <div>
            <label htmlFor="type">Jenis Layanan *</label>
            <select
              id="type"
              name="type"
              required
              value={selection.type}
              onChange={(event) => onTypeChange(event.target.value)}
              {...errorProps('type')}
            >
              <option value="" disabled>
                {typePlaceholder}
              </option>
              {typeOptions.map(({ value, label, price }) => (
                <option key={value} value={value}>
                  {label}
                  {Number.isFinite(price) ? ` · ${money(price)}` : ''}
                </option>
              ))}
              {selection.service === 'graphic' && (
                <option value={CONSULTATION}>{CONSULTATION_LABEL}</option>
              )}
            </select>
            <FieldError field="type" errors={errors} />
          </div>
        )}
        {showPackage && (
          <div>
            <label htmlFor="packageName">Paket yang Diminati *</label>
            <select
              id="packageName"
              name="packageName"
              required
              value={selection.packageName}
              onChange={(event) => onPackageChange(event.target.value)}
              {...errorProps('packageName')}
            >
              <option value="" disabled>
                Pilih paket
              </option>
              {packageOptions.map(({ name, price }) => (
                <option key={name} value={name}>
                  {name} · {money(price)}
                </option>
              ))}
              <option value={CONSULTATION}>{CONSULTATION_LABEL}</option>
            </select>
            <FieldError field="packageName" errors={errors} />
          </div>
        )}
        <div>
          <label htmlFor="message">
            Ceritakan Kebutuhan Anda <span className="optional-label">(opsional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Ceritakan kebutuhan, referensi desain, fitur tambahan, atau target waktu Anda..."
            value={fields.message}
            onChange={(event) => onFieldChange('message', event.target.value)}
          ></textarea>
        </div>
        <div className="form-footer">
          <p>
            Harga yang ditampilkan adalah harga paket. Tambahan fitur dibahas melalui konsultasi.
          </p>
          <button className="button primary" type="submit">
            Konsultasi via WhatsApp <span>↗</span>
          </button>
        </div>
      </form>
    </div>
  );
}
