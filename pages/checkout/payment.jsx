import Router from 'next/router';
import Head from 'next/head';
import { cartValid, checkoutInfoValid } from 'utils/checkout';
import { useCart, useCheckoutInfo } from 'hooks/store';
import Layout from 'components/layout';
import LocalCheckout from 'components/checkout/local-checkout';
import WorldwideCheckout from 'components/checkout/worldwide-checkout';

function CheckoutPaymentPage() {
  const cart = useCart();
  const checkoutInfo = useCheckoutInfo();

  if (!cartValid(cart)) {
    Router.replace('/checkout/summary');
    return null;
  }

  if (!checkoutInfoValid(checkoutInfo)) {
    Router.replace('/checkout/shipping');
    return null;
  }

  return (
    <Layout>
      <Head>
        <title>Payment – Fustic Store</title>
      </Head>

      <div className="checkout-payment-page">
        {checkoutInfo.shipping.country === 'Vietnam'
          ? <LocalCheckout />
          : <WorldwideCheckout />}
      </div>

      <style jsx>
        {`
        .checkout-payment-page {
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

export default CheckoutPaymentPage;
