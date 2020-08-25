import { useSelector } from 'react-redux';
import { selectCategories, selectCart, selectCheckoutInfo } from 'store/selectors';

export function useCategories() {
  return useSelector(selectCategories);
}

export function useCart() {
  return useSelector(selectCart);
}

export function useCheckoutInfo() {
  return useSelector(selectCheckoutInfo);
}
