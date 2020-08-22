import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';

import { cartValid } from 'utils/checkout';
import { useCart } from 'hooks/store';
import Layout from 'components/layout';
import CartProductSmall from 'components/product/cart-product-small';
import Button from 'components/basic/button';
import CheckoutLayout from 'components/checkout/checkout-layout';
import CartTotal from 'components/checkout/cart-total';

function CheckoutSummaryPage() {
  const cart = useCart();

  return (
    <Layout>
      <Head>
        <title>Shopping Cart – Fustic Store</title>
      </Head>

      <div className="checkout-summary-page">
        <CheckoutLayout>
          <div className="cart-entries">
            {cart.map((entry, i) => (
              <Fragment key={`${entry.product.id}${entry.sizeName}`}>
                {i !== 0 && <hr />}
                <CartProductSmall cartEntry={entry} noneditable />
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

            .info .button-group {
              margin-top: 6em;
            }
          }

          @media screen and (min-width: 1200px) {
            padding-top: 12rem;
          }
        }
        `}
      </style>
    </Layout>
  );
}

export default CheckoutSummaryPage;
