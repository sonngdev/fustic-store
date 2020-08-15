import { useSelector } from 'react-redux';
import Router from 'next/router';
import { selectCheckoutInfo } from 'store/selectors';
import { checkoutInfoValid } from 'utils/checkout';
import LocalCheckout from 'components/checkout/local-checkout';

function CheckoutMethodPage() {
  const checkoutInfo = useSelector(selectCheckoutInfo);

  if (!checkoutInfoValid(checkoutInfo)) {
    Router.push('/checkout/info');
    return null;
  }

  return checkoutInfo.shipping.country === 'Vietnam'
    ? <LocalCheckout />
    : <div>Worldwide</div>;
}

export default CheckoutMethodPage;
