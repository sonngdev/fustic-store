export function formatPriceVnd(price) {
  if (typeof price !== 'number') {
    throw new TypeError(`expected price to be number, received ${typeof price}`);
  }

  return `${price.toString().slice(0, -3)}K`;
}

export function snakeToCamel(str) {
  if (typeof str !== 'string') {
    throw new TypeError(`expected argument of type string, received ${typeof str}`);
  }

  return str.replace(/_[a-z]/g, (char) => char[1].toUpperCase());
}

export function camelToSnake(str) {
  if (typeof str !== 'string') {
    throw new TypeError(`expected argument of type string, received ${typeof str}`);
  }

  return str.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`);
}

export function capitalCase(str) {
  if (typeof str !== 'string') {
    throw new TypeError(`expected argument of type string, received ${typeof str}`);
  }

  return `${str.slice(0, 1).toUpperCase()}${str.slice(1).toLowerCase()}`;
}

export function titleCase(str) {
  if (typeof str !== 'string') {
    throw new TypeError(`expected argument of type string, received ${typeof str}`);
  }

  return str.trim().split(/\s+/g).map(capitalCase).join(' ');
}
