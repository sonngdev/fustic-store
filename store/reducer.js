import {
  ADD_TO_CART,
  MINUS_FROM_CART,
  CLEAR_FROM_CART,
  SAVE_CHECKOUT_INFO,
  UPDATE_CART_PRODUCTS,
  COMPLETE_CHECKOUT,
} from './actions';

const defaultState = {
  cart: [],
  checkoutInfo: null,
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

function minusProduct(cart, product, sizeName) {
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

function saveCheckoutInfo(info) {
  return {
    contact: {
      firstName: info.firstName,
      lastName: info.lastName,
      email: info.email,
      phone: info.phone,
    },
    shipping: {
      country: info.country,
      city: info.city,
      district: info.district,
      zipCode: info.zipCode,
      address: info.address,
      notes: info.notes,
    },
  };
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: addProduct(state.cart, action.payload.product, action.payload.sizeName),
      };
    case MINUS_FROM_CART:
      return {
        ...state,
        cart: minusProduct(state.cart, action.payload.product, action.payload.sizeName),
      };
    case CLEAR_FROM_CART:
      return {
        ...state,
        cart: clearProduct(state.cart, action.payload.product, action.payload.sizeName),
      };
    case SAVE_CHECKOUT_INFO:
      return {
        ...state,
        checkoutInfo: saveCheckoutInfo(action.payload),
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
