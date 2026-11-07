import { useState } from 'react';
import { contact, scopes, buildMessage } from '../config/contact';
import { getPackageBudget, getPackageScopeIndex } from '../utils/projectBrief';

export default function useProjectBrief() {
  const [scopeIndex, setScopeIndex] = useState('0');
  const [budget, setBudget] = useState('Rp3–7,5 juta');
  const [notice, setNotice] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const whatsappLink = /^[1-9]\d{7,14}$/.test(contact.whatsapp)
    ? `https://wa.me/${contact.whatsapp}`
    : undefined;

  function choosePackage(packageOption) {
    setSelectedPackage(packageOption);
    setScopeIndex(getPackageScopeIndex(packageOption.service));
    setBudget(getPackageBudget(packageOption.price));
    document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth' });
    setNotice(
      `${packageOption.service} — ${packageOption.name} dipilih. Lengkapi formulir untuk konsultasi.`,
    );
  }

  function sendBrief(event) {
    event.preventDefault();
    if (!whatsappLink) {
      setNotice(
        'Nomor WhatsApp Krealance belum diisi. Pengiriman akan tersedia setelah kontak dikonfigurasi.',
      );
      return;
    }
    const form = new FormData(event.currentTarget);
    const message = buildMessage({
      name: form.get('name').trim(),
      email: form.get('email').trim(),
      scope: scopes[Number(scopeIndex)],
      packageName: selectedPackage
        ? `${selectedPackage.service} — ${selectedPackage.name}`
        : 'Belum dipilih',
      budget,
      message: form.get('message').trim(),
    });
    window.open(
      `${whatsappLink}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    );
    setNotice('Lanjutkan di WhatsApp untuk memeriksa dan mengirim pesan Anda.');
  }

  return {
    scopeIndex,
    setScopeIndex,
    budget,
    setBudget,
    notice,
    selectedPackage,
    whatsappLink,
    choosePackage,
    sendBrief,
    clearNotice: () => setNotice(''),
    clearSelectedPackage: () => setSelectedPackage(null),
  };
}
