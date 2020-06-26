export function formatPriceVnd(price) {
  if (typeof price !== 'number') {
    throw new TypeError(`expected price to be number, received ${typeof price}`);
  }

  return `${price.toString().slice(0, -3)}K`;
}
