// outsource dependencies
import qs from 'qs';
import _ from 'lodash';

// local dependencies
import Param from './param';

export interface RouteOptions {
  REGEXP?: RegExp
  query?: Array<Param<any, any>>
  params?: Array<Param<any, any>>
  isActive?: (url: string) => boolean
  parsePath?: (value: string) => { [key: string]: any; }
  parseQuery?: (value: string) => { [key: string]: any; }
  formatPath?: (params: { [key: string]: any; }) => string
  formatQuery?: (params: { [key: string]: any; }) => string
}

export type ParamType = number | string | Array<unknown>

export default class Route {

  readonly RELATIVE_ROUTE: string;

  readonly ROUTE: string;

  readonly RELATIVE_DEEP: string;

  readonly REGEXP: RegExp;

  readonly isActive: any;

  static regParam = /:([^/]*)/gi;

  readonly query: Array<Param<any, any>> = [];

  readonly params: Array<Param<any, any>> = [];

  static getSearch = () => String(_.get(window, 'location.search') || '');

  static getPathname = () => String(_.get(window, 'location.pathname') || '');

  private formatQuery: (params: { [key: string]: any; }) => string = params => {
    const result: { [key: string]: any; } = {};
    _.forEach(params, (value, key) => {
      const r = _.find(this.query, { name: key });
      if (r) {
        const v = r.to(value);
        if (v) {
          result[r.short] = v;
        }
      }
    });
    return qs.stringify(result, { addQueryPrefix: true });
  };

  private parseQuery = (queryString: string) => {
    const result: { [key: string]: any; } = {};
    const params = qs.parse(queryString, { ignoreQueryPrefix: true });
    this.query.forEach(param => {
      const value = params[param.short] as string;
      result[param.name] = param.from(value);
    });
    return result;
  };

  private parsePath = (url: string) => {
    const result: { [key: string]: any; } = {};
    // @ts-ignore
    const matcher = new RegExp(String(this.ROUTE).replace(Route.regParam, (a, propName) => `(?<${propName}>[^/]+)`), 'i');
    const p: { [key: string]: any; } = _.get(String(url).match(matcher), 'groups', {});
    this.params.forEach(param => {
      result[param.name] = param.from(p[param.name]);
    });
    return result;
  };

  private formatPath = (params: { [key: string]: any; }) => {
    const result: { [key: string]: any; } = {};
    this.params.forEach(param => {
      result[param.short] = param.from(params[param.name]);
    });
    // @ts-ignore
    return String(this.ROUTE).replace(Route.regParam, (match, propName) => {
      return encodeURIComponent(result[propName]);
    });
  };

  static create = (url: string, relativePath: string, options: RouteOptions = {}) => {
    if (!_.isString(url)) {
      throw new Error('Route error: first parameter "url" is required and should be a string');
    }
    if (!_.isString(relativePath)) {
      throw new Error('Route error: first parameter "relativePath" is required and should be a string');
    }
    return new Route(url, relativePath, options);
  };

  constructor (url: string, relativePath: string, options: RouteOptions) {
    // NOTE prepare public props
    this.RELATIVE_ROUTE = relativePath;
    this.ROUTE = `${url}/${this.RELATIVE_ROUTE}`;
    this.RELATIVE_DEEP = `${this.RELATIVE_ROUTE}/*`;
    this.REGEXP = Route.defineREGEXP(this.ROUTE, options.REGEXP);
    this.isActive = Route.defineIsActive(this.REGEXP, options.isActive);
    this.query = Route.defineQueryAnnotation(url, options.query);
    this.params = Route.defineParamsAnnotation(this.ROUTE, options.params);
  }

  static defineROUTE = (url: string) => String(url).replace(/\?.*/, '');

  static defineREGEXP = (url: string, custom?: RegExp) => (_.isRegExp(custom)
    ? custom
    : new RegExp(String(url).replace(Route.regParam, '.*'), 'i'));

  static defineIsActive = (regexp: RegExp, custom?: (url: string) => boolean) => (_.isFunction(custom)
    ? custom
    : () => regexp.test(Route.getPathname()));

  // @ts-ignore
  static defineQueryAnnotation = (url: string, options?: Array<Param<any, any>>) => {
    const annotation: Array<Param<any, any>> = [];
    if (_.isArray(options)) {
      options.forEach(item => {
        annotation.push(Param.create(item));
      });
    }
    return annotation;
  };

  // @ts-ignore
  static defineParamsAnnotation = (url: string, options?: Array<Param<any, any>>) => {
    const annotation: Array<Param<ParamType, ParamType>> = [];
    if (_.isArray(options)) {
      options.forEach(item => {
        return annotation.push(Param.create(item));
      });
    }
    return annotation;
  };

  LINK = (params?: { [key: string]: any; }, query?: { [key: string]: any; }) => {
    params = Object.assign({}, params);
    query = Object.assign({}, query);
    return `${this.formatPath(params)}${this.formatQuery(query)}`;
  };

  PARAMS = (pathname?: string) => this.parsePath(_.isString(pathname) ? pathname : Route.getPathname());

  QUERY = (search?: string) => this.parseQuery(_.isString(search) ? search : Route.getSearch());
}
