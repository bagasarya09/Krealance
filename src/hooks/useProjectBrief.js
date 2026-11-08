import { useEffect, useRef, useState } from 'react';
import { contact, buildMessage } from '../config/contact';
import { money } from '../utils/currency';
import {
  CONSULTATION,
  getCardSelection,
  getBriefDetails,
  getPackageOptions,
  getSelectedOffer,
  getServiceTypes,
  validateSelection,
} from '../utils/projectBrief';

export default function useProjectBrief() {
  const [fields, setFields] = useState({ name: '', contact: '', message: '' });
  const [selection, setSelection] = useState({ service: '', type: '', packageName: '' });
  const [pendingPackageName, setPendingPackageName] = useState('');
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [focusRequest, setFocusRequest] = useState(0);
  const formRef = useRef(null);
  const focusField = useRef(null);
  const whatsappLink = /^[1-9]\d{7,14}$/.test(contact.whatsapp)
    ? `https://wa.me/${contact.whatsapp}`
    : undefined;

  useEffect(() => {
    if (!focusRequest || !formRef.current) return;
    const form = formRef.current;
    const incomplete = ['name', 'contact', 'service', 'type', 'packageName']
      .map((name) => form.elements.namedItem(name))
      .find((element) => element?.required && !element.value.trim());
    const target = focusField.current
      ? form.elements.namedItem(focusField.current)
      : incomplete || form.elements.namedItem('message');
    target?.focus({ preventScroll: true });
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    form.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
  }, [focusRequest]);

  function clearSelectionErrors() {
    setErrors((previous) => ({
      ...previous,
      service: undefined,
      type: undefined,
      packageName: undefined,
    }));
  }

  function changeField(name, value) {
    setFields((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  }

  function changeService(service) {
    setSelection({ service, type: '', packageName: '' });
    setPendingPackageName('');
    clearSelectionErrors();
    setNotice('');
  }

  function changeType(type) {
    const canUsePending =
      pendingPackageName &&
      getPackageOptions(selection.service, type).some((entry) => entry.name === pendingPackageName);
    setSelection((previous) => ({
      ...previous,
      type,
      packageName: canUsePending ? pendingPackageName : '',
    }));
    setPendingPackageName('');
    clearSelectionErrors();
    setNotice('');
  }

  function changePackage(packageName) {
    setSelection((previous) => ({ ...previous, packageName }));
    setPendingPackageName('');
    setErrors((previous) => ({ ...previous, packageName: undefined }));
    setNotice('');
  }

  function choosePackage(option) {
    const result = getCardSelection(option);
    if (!result) {
      setNotice('Paket belum tersedia. Silakan pilih layanan pada formulir konsultasi.');
      return;
    }
    setSelection(result.selection);
    setPendingPackageName(result.pendingPackageName);
    clearSelectionErrors();
    focusField.current = null;
    setFocusRequest((request) => request + 1);
    const details = getBriefDetails(result.selection);
    setNotice(
      result.pendingPackageName
        ? `Paket ${result.pendingPackageName} dipilih. Pilih platform desain pada formulir.`
        : `${[details.service, details.type, details.packageName].filter(Boolean).join(' — ')} dipilih. Lengkapi formulir untuk konsultasi.`,
    );
  }

  function chooseCustomService(context = {}) {
    const service = ['website', 'uiux', 'graphic'].includes(context.service)
      ? context.service
      : 'consultation';
    const hasType = getServiceTypes(service).some((option) => option.value === context.type);
    const type = hasType ? context.type : service === 'graphic' ? CONSULTATION : '';
    setSelection({
      service,
      type,
      packageName: hasType && service !== 'graphic' ? CONSULTATION : '',
    });
    setPendingPackageName('');
    clearSelectionErrors();
    const note = 'Saya ingin berkonsultasi mengenai fitur atau desain khusus.';
    setFields((previous) => ({
      ...previous,
      message: previous.message.includes(note)
        ? previous.message
        : [previous.message, note].filter(Boolean).join('\n\n'),
    }));
    focusField.current = 'message';
    setFocusRequest((request) => request + 1);
    setNotice(
      'Konsultasi fitur atau desain khusus dipilih. Lengkapi kebutuhan Anda pada formulir.',
    );
  }

  function sendBrief(event) {
    event.preventDefault();
    const nextErrors = {
      ...(!fields.name.trim() ? { name: 'Masukkan nama Anda.' } : {}),
      ...(!fields.contact.trim()
        ? { contact: 'Masukkan nomor WhatsApp atau alamat email Anda.' }
        : {}),
      ...validateSelection(selection),
    };
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      formRef.current?.elements.namedItem(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    if (!whatsappLink) {
      setNotice(
        'Nomor WhatsApp Krealance belum diisi. Pengiriman akan tersedia setelah kontak dikonfigurasi.',
      );
      return;
    }
    const message = buildMessage({
      name: fields.name.trim(),
      contact: fields.contact.trim(),
      ...getBriefDetails(selection),
      message: fields.message,
    });
    window.open(
      `${whatsappLink}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    );
    setNotice('Lanjutkan di WhatsApp untuk memeriksa dan mengirim pesan Anda.');
  }

  const offer = getSelectedOffer(selection);
  const details = getBriefDetails(selection);
  const summary = offer
    ? `${[details.service, details.type, details.packageName].filter(Boolean).join(' — ')} · ${money(offer.price)}`
    : pendingPackageName
      ? `Desain UI/UX — ${pendingPackageName} · pilih platform terlebih dahulu`
      : '';

  return {
    notice,
    whatsappLink,
    choosePackage,
    chooseCustomService,
    clearNotice: () => setNotice(''),
    form: {
      formRef,
      fields,
      selection,
      errors,
      summary,
      pendingPackageName,
      onFieldChange: changeField,
      onServiceChange: changeService,
      onTypeChange: changeType,
      onPackageChange: changePackage,
      onSubmit: sendBrief,
    },
  };
}
