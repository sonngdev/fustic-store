import { useSelector } from 'react-redux';
import { selectCart, selectCheckoutInfo } from 'store/selectors';

export function useCart() {
  return useSelector(selectCart);
}

export function useCheckoutInfo() {
  return useSelector(selectCheckoutInfo);
}
