import Router from 'next/router';
import { checkoutInfoValid } from 'utils/checkout';
import { useCheckoutInfo } from 'hooks/store';
import Layout from 'components/layout';
import LocalCheckout from 'components/checkout/local-checkout';

function CheckoutMethodPage() {
  const checkoutInfo = useCheckoutInfo();

  if (!checkoutInfoValid(checkoutInfo)) {
    Router.push('/checkout/info');
    return null;
  }

  return (
    <Layout>
      <div className="checkout-method-page">
        {checkoutInfo.shipping.country === 'Vietnam'
          ? <LocalCheckout />
          : <div>Worldwide</div>}
      </div>

      <style jsx>
        {`
        .checkout-method-page {
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
