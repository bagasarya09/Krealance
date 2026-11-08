import { websitePackages, uiPackages, graphicPackages } from '../data/packages';

export const CONSULTATION = '__consultation__';
export const CONSULTATION_LABEL = 'Belum yakin, ingin konsultasi dulu';
export const UNDECIDED_LABEL = 'Belum ditentukan, ingin konsultasi';
export const serviceOptions = [
  { value: 'website', label: 'Website' },
  { value: 'uiux', label: 'Desain UI/UX' },
  { value: 'graphic', label: 'Desain Grafis' },
  { value: 'consultation', label: CONSULTATION_LABEL },
];

export function getServiceTypes(service) {
  if (service === 'website') {
    return Object.keys(websitePackages).map((name) => ({ value: name, label: name }));
  }
  if (service === 'uiux') {
    return Object.keys(uiPackages).map((name) => ({ value: name, label: name }));
  }
  if (service === 'graphic') {
    return graphicPackages.map(({ name, price }) => ({ value: name, label: name, price }));
  }
  return [];
}

export function getPackageOptions(service, type) {
  const groups = service === 'website' ? websitePackages : service === 'uiux' ? uiPackages : null;
  return groups && Object.hasOwn(groups, type) ? groups[type] : [];
}

export function getSelectedOffer({ service, type, packageName }) {
  if (service === 'graphic') return graphicPackages.find((entry) => entry.name === type);
  return getPackageOptions(service, type).find((entry) => entry.name === packageName);
}

export function validateSelection(selection) {
  const { service, type, packageName } = selection;
  if (!serviceOptions.some((option) => option.value === service)) {
    return { service: 'Pilih layanan yang dibutuhkan.' };
  }
  if (service === 'consultation') return {};
  const typeIsValid = getServiceTypes(service).some((option) => option.value === type);
  if (!typeIsValid && !(service === 'graphic' && type === CONSULTATION)) {
    return { type: 'Pilih jenis layanan yang sesuai.' };
  }
  if (service !== 'graphic' && packageName !== CONSULTATION && !getSelectedOffer(selection)) {
    return { packageName: 'Pilih paket yang diminati atau opsi konsultasi.' };
  }
  return {};
}

export function getBriefDetails(selection) {
  const { service, type, packageName } = selection;
  if (service === 'consultation') return { service: UNDECIDED_LABEL };
  const offer = getSelectedOffer(selection);
  return {
    service: serviceOptions.find((option) => option.value === service)?.label,
    type: type === CONSULTATION ? UNDECIDED_LABEL : type || undefined,
    packageName:
      service === 'graphic'
        ? undefined
        : packageName === CONSULTATION
          ? UNDECIDED_LABEL
          : offer?.name,
    price: offer?.price,
  };
}

// Card identities use service/type/name, never a formatted price or an array position.
// Also accept the earlier card shape, including a UI/UX card without a platform.
export function getCardSelection(option) {
  let { service, type = '', packageName = option.name || '' } = option;
  if (Object.hasOwn(websitePackages, service)) {
    type = service;
    service = 'website';
  } else if (service?.startsWith('UI/UX')) {
    type = type || service.slice('UI/UX'.length).trim();
    service = 'uiux';
  } else if (service === 'Desain Grafis') {
    type = option.name;
    service = 'graphic';
  }

  if (service === 'uiux' && !type) {
    const exists = Object.values(uiPackages).some((packages) =>
      packages.some((entry) => entry.name === packageName),
    );
    return exists
      ? { selection: { service, type: '', packageName: '' }, pendingPackageName: packageName }
      : null;
  }
  const selection = { service, type, packageName: service === 'graphic' ? '' : packageName };
  return getSelectedOffer(selection) ? { selection, pendingPackageName: '' } : null;
}
