export function getCartTotal(cart) {
  const vnd = cart.reduce((acc, entry) => acc + entry.product.priceVnd * entry.quantity, 0);
  const usd = cart.reduce((acc, entry) => acc + entry.product.priceUsd * entry.quantity, 0);
  return [vnd, usd];
}

export function getCartQuantity(cart) {
  return cart.reduce((acc, entry) => acc + entry.quantity, 0);
}
