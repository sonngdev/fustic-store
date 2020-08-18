import { Fragment, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';

import { getCartTotal, cartValid } from 'utils/checkout';
import { useCart } from 'hooks/store';
import Layout from 'components/layout';
import CartProductSmall from 'components/product/cart-product-small';
import Button from 'components/basic/button';

function CheckoutSummaryPage() {
  const cart = useCart();
  const [vndSubtotal, usdSubtotal] = getCartTotal(cart);
  const [vndShipping, usdShipping] = [35000, 60];
  const [vndTax, usdTax] = [0, 60];
  const [vndTotal, usdTotal] = [
    vndSubtotal + vndShipping + vndTax,
    usdSubtotal + usdShipping + usdTax,
  ];

  const [discountCode, setDiscountCode] = useState('');

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
          <div className="total">
            <table>
              <tbody>
                <tr>
                  <th>Subtotal</th>
                  <td>{vndSubtotal.toLocaleString()} vnd</td>
                  <td>${usdSubtotal.toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Shipping</th>
                  <td>{vndShipping.toLocaleString()} vnd</td>
                  <td>${usdShipping.toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Tax</th>
                  <td>{vndTax.toLocaleString()} vnd</td>
                  <td>${usdTax.toLocaleString()}</td>
                </tr>
                <tr />
                <tr>
                  <th>Total</th>
                  <td>{vndTotal.toLocaleString()} vnd</td>
                  <td>${usdTotal.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="discount-code">
            <input
              type="text"
              placeholder="Discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button type="button" className="add-discount">
              <span>+</span>
            </button>
          </div>

          <div className="button-group">
            <Button block onClick={Router.back}>Back</Button>
            <Link href="/checkout/info">
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

            &, & .total, & .discount-code, & .button-group {
              max-width: 300px;
            }

            .total {
              margin-top: 3rem;
              padding: 0;
              width: 100%;

              table {
                text-transform: uppercase;
                width: 100%;

                tr {
                  height: 2.2em;
                }

                tr > :first-child {
                  text-align: left;
                  width: 30%;
                }

                tr > :nth-child(2) {
                  text-align: right;
                  opacity: 0.4;
                  font-weight: var(--fontweight-regular);
                  width: 40%;
                }

                tr > :last-child {
                  text-align: left;
                  opacity: 0.4;
                  font-weight: var(--fontweight-regular);
                  padding-left: 10%;
                  width: 30%;
                }
              }
            }

            .discount-code {
              position: relative;
              margin-top: 0.5rem;
              width: 100%;

              .add-discount {
                position: absolute;
                top: 10px;
                right: 10px;

                background-color: var(--color-text);
                color: var(--color-background);
                padding: 0.1em;
                height: 1.5em;
                width: 1.5em;

                span {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-size: 1.5em;
                  line-height: 0.7;
                }
              }
            }

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

            .total table tr > :last-child {
              padding-left: 14%;
            }
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

              .total {
                margin-top: 0;

                table {
                  height: 100%;
                }
              }

              .discount-code {
                margin-top: 1.5em;
              }

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
