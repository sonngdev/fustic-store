import Router from 'next/router';
import { cartValid, checkoutInfoValid } from 'utils/checkout';
import { useCart, useCheckoutInfo } from 'hooks/store';
import Layout from 'components/layout';
import LocalCheckout from 'components/checkout/local-checkout';
import WorldwideCheckout from 'components/checkout/worldwide-checkout';

function CheckoutMethodPage() {
  const cart = useCart();
  const checkoutInfo = useCheckoutInfo();

  if (!cartValid(cart)) {
    Router.push('/checkout/cart');
    return null;
  }

  if (!checkoutInfoValid(checkoutInfo)) {
    Router.push('/checkout/info');
    return null;
  }

  return (
    <Layout>
      <div className="checkout-method-page">
        {checkoutInfo.shipping.country === 'Vietnam'
          ? <LocalCheckout />
          : <WorldwideCheckout />}
      </div>

      <style jsx>
        {`
        .checkout-method-page {
          width: 100%;
          padding: 6rem var(--padding-page) 0;

          @media screen and (min-width: 1200px) {
            padding-top: 8rem;
          }
        }
        `}
      </style>
    </Layout>
  );
}

export default CheckoutMethodPage;
