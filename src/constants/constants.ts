
export const NEW_ID = 'new';

export const PERMALINK_REGEX = /^(?!-)[-\w\d]*[^-_]$/;

export const CURRENCY = {
  USD: 'USD', // US Dollar
  EUR: 'EUR', // Euro
  UAH: 'UAH', // Grivna
} as const;

export type Currency = typeof CURRENCY[keyof typeof CURRENCY];

export const CURRENCY_SYMBOL = {
  [CURRENCY.USD]: '$',
  [CURRENCY.EUR]: '€',
  [CURRENCY.UAH]: '₴'
} as const;

export type CurrencySymbol = typeof CURRENCY_SYMBOL[keyof typeof CURRENCY_SYMBOL];

export const ROLE = {
  USER: 'User',
  ADMIN: 'Admin',
} as const;

export type Role = typeof ROLE[keyof typeof ROLE];

export const ROLE_LABEL = {
  [ROLE.USER]: 'User',
  [ROLE.ADMIN]: 'Admin',
} as const;

export type RoleLabel = typeof ROLE_LABEL[keyof typeof ROLE_LABEL];

export enum REGISTER_REQUEST_STATUS {
  CREATED = 'Created',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  IN_PROGRESS = 'InProgress',
}

export const ERROR_MESSAGE_CODE = {
  TEST_ERROR: 'TEST_ERROR',
  TOKEN_EXPIRED: 'jwt expired',
  INVALID_CURRENT_PASSWORD: 'INVALID_CURRENT_PASSWORD',
  USER_WITH_SUCH_EMAIL_ALREADY_EXISTS: 'USER_WITH_SUCH_EMAIL_ALREADY_EXISTS',
};

/**
 * @export
 * @enum {string}
 */
export enum ActuatorHealthStatus {
  UP = 'UP',
  DOWN ='DOWN'
}
