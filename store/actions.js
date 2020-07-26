export const ADD_TO_CART = 'ADD_TO_CART';
export const MINUS_FROM_CART = 'MINUS_FROM_CART';
export const CLEAR_FROM_CART = 'CLEAR_FROM_CART';
export const SAVE_CHECKOUT_INFO = 'SAVE_CHECKOUT_INFO';

export const addToCart = (product, sizeName) => ({
  type: ADD_TO_CART,
  payload: { product, sizeName },
});

export const minusFromCart = (product, sizeName) => ({
  type: MINUS_FROM_CART,
  payload: { product, sizeName },
});

export const clearFromCart = (product, sizeName) => ({
  type: CLEAR_FROM_CART,
  payload: { product, sizeName },
});

export const saveCheckoutInfo = (info) => ({
  type: SAVE_CHECKOUT_INFO,
  payload: info,
});
