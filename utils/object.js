import { snakeToCamel, camelToSnake } from './string';

function transformKey(fn) {
  return function transformVariant(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;

    if (Array.isArray(obj)) return obj.map(transformVariant);

    return Object.entries(obj).reduce((acc, [k, v]) => ({
      ...acc,
      [fn(k)]: transformVariant(v),
    }), {});
  };
}

export const ensureCamel = transformKey(snakeToCamel);

export const ensureSnake = transformKey(camelToSnake);

export function objectMap(object, fn) {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [key, fn(value, key)]),
  );
}
