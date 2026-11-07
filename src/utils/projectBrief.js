export const budgetOptions = [
  'Belum ditentukan',
  '< Rp3 juta',
  'Rp3–7,5 juta',
  'Rp7,5–15 juta',
  '> Rp15 juta',
];

export function getPackageBudget(price) {
  if (price === 0) return budgetOptions[0];
  if (price < 3000000) return budgetOptions[1];
  if (price <= 7500000) return budgetOptions[2];
  if (price <= 15000000) return budgetOptions[3];
  return budgetOptions[4];
}

export function getPackageScopeIndex(service) {
  if (service.startsWith('UI/UX')) return '4';
  const scopeByService = {
    'Portofolio Web': '0',
    'Landing Page': '1',
    'E-Commerce': '2',
    'Company Profile': '3',
    'Desain Grafis': '5',
    'Konsultasi Khusus': '7',
  };
  return scopeByService[service] ?? '3';
}
