import { z } from 'zod';

const STRING = z.string();

const EMAIL = STRING.email('Please type valid email');

const NAME = z.string()
  .min(3, 'Should be at least 3 characters in a length')
  .max(16, 'Should be no more than 16 characters in a length');

const PASSWORD = z.string()
  .min(8, 'Should be at least 8 characters in a length')
  .max(32, 'Should be no more than 32 characters in a length')
  .regex(/[0-9]/g, 'Password should contain at least one numeric character')
  .regex(/[!@#$%^&*)(+=._-]/g, 'Password should contain at least one special character e.g.(!@#$%^&*)');

export const ValidationRules = {
  NAME,
  EMAIL,
  STRING,
  PASSWORD
};
