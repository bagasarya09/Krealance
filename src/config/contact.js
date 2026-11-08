import { money } from '../utils/currency';

// Isi kontak Anda di sini. Nomor WA: kode negara tanpa tanda +, spasi, atau awalan 0.
export const contact = { whatsapp: '62895703101140', email: 'krealance@gmail.com' };
export function buildMessage({
  name,
  contact: contactValue,
  service,
  type,
  packageName,
  price,
  message,
}) {
  return [
    'Halo Krealance, saya ingin berkonsultasi.',
    '',
    `Nama: ${name}`,
    `Kontak: ${contactValue}`,
    `Layanan: ${service}`,
    ...(type ? [`Jenis layanan: ${type}`] : []),
    ...(packageName ? [`Paket: ${packageName}`] : []),
    ...(Number.isFinite(price) ? [`Harga paket: ${money(price)}`] : []),
    '',
    'Kebutuhan:',
    message?.trim() || 'Ingin berkonsultasi terlebih dahulu.',
  ].join('\n');
}
