import {
  CACHE_CATEGORIES,
  ADD_TO_CART,
  SUBTRACT_FROM_CART,
  CLEAR_FROM_CART,
  CHANGE_CHECKOUT_INFO,
  UPDATE_CART_PRODUCTS,
  COMPLETE_CHECKOUT,
} from './actions';

const defaultState = {
  categories: [],
  cart: [],
  checkoutInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    district: '',
    zipCode: '',
    address: '',
    notes: '',
  },
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

function subtractProduct(cart, product, sizeName) {
  const entry = cart.find((e) => e.product.id === product.id && e.sizeName === sizeName);

  if (!entry || entry.quantity === 1) return [...cart];

  const newEntry = { ...entry, quantity: entry.quantity - 1 };
  return [
    ...cart.slice(0, cart.indexOf(entry)),
    newEntry,
    ...cart.slice(cart.indexOf(entry) + 1),
  ];
}

function clearProduct(cart, product, sizeName) {
  const entry = cart.find((e) => e.product.id === product.id && e.sizeName === sizeName);
  return cart.filter((e) => e !== entry);
}

function updateCartProducts(cart, products) {
  return cart.map((e) => {
    const updatedProduct = products.find((p) => p.id === e.product.id);

    if (!updatedProduct) return e;
    return { ...e, product: updatedProduct };
  });
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case CACHE_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: addProduct(state.cart, action.payload.product, action.payload.sizeName),
      };
    case SUBTRACT_FROM_CART:
      return {
        ...state,
        cart: subtractProduct(state.cart, action.payload.product, action.payload.sizeName),
      };
    case CLEAR_FROM_CART:
      return {
        ...state,
        cart: clearProduct(state.cart, action.payload.product, action.payload.sizeName),
      };
    case CHANGE_CHECKOUT_INFO:
      return {
        ...state,
        checkoutInfo: {
          ...state.checkoutInfo,
          [action.payload.key]: action.payload.value,
        },
      };
    case UPDATE_CART_PRODUCTS:
      return {
        ...state,
        cart: updateCartProducts(state.cart, action.payload),
      };
    case COMPLETE_CHECKOUT:
      return {
        ...defaultState,
      };
    default:
      return state;
  }
}
