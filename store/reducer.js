import {
  ADD_TO_CART,
  CLEAR_FROM_CART,
} from './actions';

const defaultState = {
  cart: [],
};

function addProduct(cart, product, sizeName) {
  const entry = cart.find((e) => e.product.id === product.id && e.sizeName === sizeName);

  if (entry) {
    const newEntry = { ...entry, quantity: entry.quantity + 1 };
    return [
      ...cart.slice(0, cart.indexOf(entry)),
      newEntry,
      ...cart.slice(cart.indexOf(entry) + 1),
    ];
  }

  const newEntry = { product, quantity: 1, sizeName };
  return cart.concat(newEntry);
}

function clearProduct(cart, product, sizeName) {
  const entry = cart.find((e) => e.product.id === product.id && e.sizeName === sizeName);
  return cart.filter((e) => e !== entry);
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: addProduct(state.cart, action.payload.product, action.payload.sizeName),
      };
    case CLEAR_FROM_CART:
      return {
        ...state,
        cart: clearProduct(state.cart, action.payload.product, action.payload.sizeName),
      };
    default:
      return state;
  }
}
