// outsource dependencies
import _ from 'lodash';

// local dependencies
// import { history } from './history';
// @ts-ignore
import Route, { defineRoute } from '@/services/route';

// NOTE Allow [Route].PUSH/REPLACE
// Route.setHistory(history);

export const ENTRY_POINT = '/';


// public
export const HOME = defineRoute('', '');
export const NO_MATCH = defineRoute('', '404');
export const SIGN_IN = defineRoute('', 'sign-in');
export const SIGN_UP = defineRoute('', 'sign-up');
export const FORGOT_PASSWORD = defineRoute('', 'forgot-password');
