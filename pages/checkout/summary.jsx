import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';

import { cartValid } from 'utils/checkout';
import { useCart } from 'hooks/store';
import useFlash from 'hooks/useFlash';

import Layout from 'components/layout';
import CartProductSmall from 'components/product/cart-product-small';
import Button from 'components/basic/button';
import Alert from 'components/basic/alert';
import CheckoutLayout from 'components/checkout/checkout-layout';
import CartTotal from 'components/checkout/cart-total';

function CheckoutSummaryPage() {
  const cart = useCart();
  const flash = useFlash();

  return (
    <Layout>
      <Head>
        <title>Summary – Checkout – Fustic Store</title>
        <link rel="canonical" href={`${window.location.origin}/checkout/summary`} />
        <meta name="description" content="Checkout summary on Fustic. Store" />
        <meta name="keywords" content="fustic store,fustic studio,checkout,summary" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Fustic. Store" />
        <meta property="og:url" content={`${window.location.origin}/checkout/summary`} />
        <meta property="og:title" content="Summary – Checkout – Fustic Store" />
        <meta property="og:description" content="Checkout summary on Fustic. Store" />
        <meta property="og:image" content={`${window.location.origin}/fustic-white.png`} />
      </Head>

      <div className="checkout-summary-page">
        {flash.length
          ? (
            <div className="alert-container">
              {flash.map((f) => <Alert key={f} message={f} />)}
            </div>
          )
          : null}

        <CheckoutLayout>
          <div className="cart-entries">
            {cart.map((entry, i) => (
              <Fragment key={`${entry.product.id}${entry.sizeName}`}>
                {i !== 0 && <hr />}
                <CartProductSmall cartEntry={entry} />
              </Fragment>
            ))}
          </div>

          <div className="info">
            <CartTotal />

            <div className="button-group">
              <Button block onClick={Router.back}>Back</Button>
              <Link href="/checkout/shipping">
                <Button block solid disabled={!cartValid(cart)}>Continue</Button>
              </Link>
            </div>
          </div>
        </CheckoutLayout>
      </div>

      <style jsx>
        {`
        .checkout-summary-page {
          padding: 6rem 0 4rem;

          .alert-container {
            padding: 0 25px;
            max-width: 400px;
            margin: 0 auto 2rem;
          }

          .cart-entries {
            width: 260px;

            hr {
              margin: 2rem 0;
            }
          }

          .info .button-group {
            width: 100%;
            margin-top: 4rem;

            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 10px;
          }

          @media screen and (min-width: 768px) {
            padding-top: 10rem;

            .alert-container {
              max-width: 700px;
            }

            .info .button-group {
              margin-top: 6em;
            }
          }

          @media screen and (min-width: 1200px) {
            padding-top: 12rem;

            .alert-container {
              max-width: 790px;
            }
          }
        }
        `}
      </style>
    </Layout>
  );
}

export default CheckoutSummaryPage;
