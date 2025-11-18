export const toNumber = (value) => {
  if (value === null || value === undefined || value === '') return null;
  const number = typeof value === 'number' ? value : parseFloat(value);
  return Number.isFinite(number) ? number : null;
};

export const formatCurrency = (value) => {
  const numericValue = toNumber(value);
  if (numericValue === null) return null;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numericValue);
};

export const calculateDiscountPercentage = (price, maxPrice) => {
  const current = toNumber(price);
  const original = toNumber(maxPrice);
  if (
    current === null ||
    original === null ||
    original <= 0 ||
    current >= original
  ) {
    return null;
  }
  return Math.round(((original - current) / original) * 100);
};

