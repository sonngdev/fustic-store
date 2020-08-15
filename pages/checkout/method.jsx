import { useSelector } from 'react-redux';
import { selectCheckoutInfo } from 'store/selectors';
import { checkoutInfoValid } from 'utils/checkout';
import Router from 'next/router';

function CheckoutMethodPage() {
  const checkoutInfo = useSelector(selectCheckoutInfo);

  if (!checkoutInfoValid(checkoutInfo)) {
    Router.push('/checkout/info');
    return null;
  }

  return checkoutInfo.shipping.country === 'Vietnam'
    ? <div>Local</div>
    : <div>Worldwide</div>;
}

export default CheckoutMethodPage;
