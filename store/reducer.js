import { ADD_TO_CART } from './actions';

const defaultState = {
  cart: [],
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: state.cart.concat(action.payload),
      };
    default:
      return state;
  }
}
