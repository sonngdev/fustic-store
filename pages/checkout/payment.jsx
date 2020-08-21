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
        {checkoutInfo.country === 'Vietnam'
          ? <LocalCheckout />
          : <WorldwideCheckout />}
      </div>

      <style jsx>
        {`
        .checkout-payment-page {
          padding: 8rem 0 4rem;

          @media screen and (min-width: 768px) {
            padding-top: 12rem;
          }
        }
        `}
      </style>
    </Layout>
  );
}

export default CheckoutPaymentPage;
