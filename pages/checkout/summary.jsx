import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';

import { cartValid } from 'utils/checkout';
import { useCart } from 'hooks/store';
import Layout from 'components/layout';
import CartProductSmall from 'components/product/cart-product-small';
import Button from 'components/basic/button';
import CartTotal from 'components/checkout/cart-total';

function CheckoutSummaryPage() {
  const cart = useCart();

  return (
    <Layout>
      <Head>
        <title>Shopping Cart – Fustic Store</title>
      </Head>

      <div className="checkout-summary-page">
        <div className="cart-entries scrollbar-visible">
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
      </div>

      <style jsx>
        {`
        .checkout-summary-page {
          --padding-page: 30px;

          width: 100%;
          padding: 8rem var(--padding-page) 0;
          display: flex;
          flex-direction: column;
          align-items: center;

          .cart-entries {
            width: 260px;

            hr {
              margin: 2rem 0;
            }
          }

          .info {
            width: 100%;
            margin-top: 3rem;

            .button-group {
              width: 100%;
              margin-top: 3rem;

              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-column-gap: 10px;
            }

          }

          @media screen and (min-width: 375px) {
            --padding-page: 50px;
          }

          @media screen and (min-width: 768px) {
            display: grid;
            grid-template-columns: 4fr 6fr;
            column-gap: 4em;

            padding-top: 12rem;
            max-width: 700px;

            .cart-entries {
              max-height: 350px;
              overflow: auto;
              justify-self: right;
              align-self: start;
            }

            .info {
              align-self: stretch;
              margin-top: 0;

              .button-group {
                margin-top: 6em;
              }
            }
          }
        }
        `}
      </style>
    </Layout>
  );
}

export default CheckoutSummaryPage;
