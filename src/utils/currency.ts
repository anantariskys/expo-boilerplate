/**
 * Format angka menjadi format mata uang Rupiah
 * Contoh: 10000 -> Rp 10.000
 */
export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};
