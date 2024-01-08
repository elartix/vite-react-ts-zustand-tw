// outsource dependencies

// constants
import { NEW_ID } from '@/constants';

// local dependencies
import Param, { ParamOptions } from './param';
import Route, { RouteOptions } from './route';

export const defineRoute = (
  url: string,
  relativePath: string,
  options?: RouteOptions
) => Route.create(url, relativePath, options);
export const defineParam = <T, D>(options: ParamOptions<T, D>) => Param.create<T, D>(options);
export default defineRoute;

/**
 * Some commonly used annotations
 */

export const ANNOTATION = {
  // NOTE popular params
  ID: (options: Partial<ParamOptions<number, string>>) => defineParam<number, string>({ name: 'id', defaults: NEW_ID, ...options }),
  TOKEN: (options: Partial<ParamOptions<string, string>>) => defineParam<string, string>({ name: 'token', defaults: 'invalid-token', ...options }),
  // NOTE popular query
  SEARCH: (options: Partial<ParamOptions<string, string>>) => defineParam<string, string>({ short: 's', name: 'search', defaults: '', ...options }),
  NAME: (options: Partial<ParamOptions<string, string>>) => defineParam<string, string>({ short: 'n', name: 'name', defaults: '', ...options }),
  // @ts-ignore
  PAGE: (options: Partial<ParamOptions<number, number>>) => defineParam<number, number>({ short: 'p', name: 'page', defaults: 1, archive: Number, extract: Number, ...options }),
  SIZE: (options: Partial<ParamOptions<number, number>>) => defineParam<number, number>({
    short: 'ps',
    name: 'pageSize',
    defaults: 10,
    archive: String,
    extract: Number,
    ...options
  }),
  SORT_DIRECTION: (options: Partial<ParamOptions<string, string>>) => defineParam<string, string>({
    short: 'sd',
    name: 'sortDirection',
    defaults: 'desc',
    isValid: (value:string) => ['asc', 'desc'].includes(value),
    ...options
  }),
  SORT_FIELD: (options: Partial<ParamOptions<string, string>>) => defineParam<string, string>({
    short: 'sf',
    name: 'sortField',
    defaults: 'name',
    isValid: (value: string) => ['name'].includes(value),
    ...options
  }),
};
