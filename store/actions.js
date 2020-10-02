export const CACHE_CATEGORIES = 'CACHE_CATEGORIES';
export const ADD_TO_CART = 'ADD_TO_CART';
export const SUBTRACT_FROM_CART = 'SUBTRACT_FROM_CART';
export const CLEAR_FROM_CART = 'CLEAR_FROM_CART';
export const CHANGE_CHECKOUT_INFO = 'CHANGE_CHECKOUT_INFO';
export const UPDATE_CART_PRODUCTS = 'UPDATE_CART_PRODUCTS';
export const COMPLETE_CHECKOUT = 'COMPLETE_CHECKOUT';
export const SET_FLASH_MESSAGES = 'SET_FLASH_MESSAGES';
export const REMOVE_FLASH_MESSAGES = 'REMOVE_FLASH_MESSAGES';

export const cacheCategories = (categories) => ({
  type: CACHE_CATEGORIES,
  payload: categories,
});

export const addToCart = (product, sizeName) => ({
  type: ADD_TO_CART,
  payload: { product, sizeName },
});

export const subtractFromCart = (product, sizeName) => ({
  type: SUBTRACT_FROM_CART,
  payload: { product, sizeName },
});

export const clearFromCart = (product, sizeName) => ({
  type: CLEAR_FROM_CART,
  payload: { product, sizeName },
});

export const changeCheckoutInfo = (key, value) => ({
  type: CHANGE_CHECKOUT_INFO,
  payload: { key, value },
});

export const updateCartProducts = (products) => ({
  type: UPDATE_CART_PRODUCTS,
  payload: products,
});

export const completeCheckout = () => ({
  type: COMPLETE_CHECKOUT,
});

export const setFlashMessages = (messages) => ({
  type: SET_FLASH_MESSAGES,
  payload: messages,
});

export const removeFlashMessages = () => ({
  type: REMOVE_FLASH_MESSAGES,
});
