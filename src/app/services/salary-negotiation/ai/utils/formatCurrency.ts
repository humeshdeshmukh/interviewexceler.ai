export const formatCurrency = (value: number, currency: string = 'USD') => {
  const currencyFormatters: { [key: string]: { locale: string; currency: string; divisor?: number } } = {
    USD: { locale: 'en-US', currency: 'USD' },
    INR: { locale: 'en-IN', currency: 'INR' },
    GBP: { locale: 'en-GB', currency: 'GBP' },
    EUR: { locale: 'de-DE', currency: 'EUR' },
    CAD: { locale: 'en-CA', currency: 'CAD' },
    AUD: { locale: 'en-AU', currency: 'AUD' },
    SGD: { locale: 'en-SG', currency: 'SGD' },
    JPY: { locale: 'ja-JP', currency: 'JPY', divisor: 1 }, // JPY doesn't use decimals
    CNY: { locale: 'zh-CN', currency: 'CNY' },
    HKD: { locale: 'zh-HK', currency: 'HKD' },
    NZD: { locale: 'en-NZ', currency: 'NZD' },
    KRW: { locale: 'ko-KR', currency: 'KRW', divisor: 1 }, // KRW doesn't use decimals
    CHF: { locale: 'de-CH', currency: 'CHF' }
  };

  const formatter = currencyFormatters[currency] || currencyFormatters.USD;
  const divisor = formatter.divisor || 1;

  return new Intl.NumberFormat(formatter.locale, {
    style: 'currency',
    currency: formatter.currency,
    maximumFractionDigits: divisor === 1 ? 0 : 0, // Remove decimal places for all currencies
    minimumFractionDigits: 0
  }).format(value / divisor);
};
