import { canAddMore } from 'utils/checkout';
import { useCart } from './store';

export default function useCanAddMoreProduct(product, sizeName) {
  const cart = useCart();
  return canAddMore(product, sizeName, cart);
}
