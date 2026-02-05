import { format } from 'date-fns';

import { config, type Currency, CURRENCY } from '@/constants';

/**
 * prepare text price depend on currency
 * @param {Number} price amount of money
 * @param {Currency} currency currency value
 * @returns {String}
 */
export const formatPrice = (price: number = 1, currency: Currency = CURRENCY.USD): string => new Intl
  .NumberFormat('en', { style: 'currency', currency }).format(price);

export const formatDate = (date: Date | number | string) => {
  const formatDate = config('DATE_TIME_FORMAT');
  return format(new Date(date), formatDate);
};
