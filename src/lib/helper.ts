export const formatTitle = (title: string): string => {
  return title
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const removeDash = (text: string): string => {
  return text.replace(/-+/g, ' ');
};

export const formatCurrency = (currency: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'usd',
  }).format(currency);
};

export const generateTrackingNumber = (): string => {
  const suffix = '9205';

  const random =
    Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join('') +
    new Date().getTime();

  const formatted = random.match(/.{1,4}/g)?.join(' ');

  return `${suffix} ${formatted}`;
};

export const generateSKU = (brand: string): string => {
  const normalizeBrand = brand
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .padEnd(3, 'X')
    .slice(0, 3);

  const random = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 10),
  ).join('');

  return `${normalizeBrand}${random}`;
};
