
export const NEW_ID = 'new';

export const PERMALINK_REGEX = /^(?!-)[-\w\d]*[^-_]$/;

export const CURRENCY = {
  USD: 'USD', // US Dollar
  EUR: 'EUR', // Euro
  UAH: 'UAH', // Grivna
};

export const CURRENCY_SYMBOL = {
  [CURRENCY.USD]: '$',
  [CURRENCY.EUR]: '€',
  [CURRENCY.UAH]: '₴'
};

export enum ROLE {
  USER = 'User',
  ADMIN = 'Admin',
}

export const ROLE_LABEL = {
  [ROLE.USER]: 'User',
  [ROLE.ADMIN]: 'Admin',
};

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
