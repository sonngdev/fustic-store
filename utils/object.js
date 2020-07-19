import { snakeToCamel } from './string';

export function ensureCamel(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;

  if (Array.isArray(obj)) return obj.map(ensureCamel);

  return Object.entries(obj).reduce((acc, [k, v]) => ({
    ...acc,
    [snakeToCamel(k)]: ensureCamel(v),
  }), {});
}
