import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useSelector } from 'react-redux';

import { selectCart } from 'store/selectors';
import { getCartTotal } from 'utils/cart';
import { getCategories } from 'utils/request';
import Category from 'models/Category';

import Layout from 'components/layout';
import CartProductSmall from 'components/product/cart-product-small';
import Button from 'components/basic/button';

function CartPage({ categories }) {
  const cart = useSelector(selectCart);
  const [vndSubtotal, usdSubtotal] = getCartTotal(cart);
  const [vndShipping, usdShipping] = [35000, 60];
  const [vndTax, usdTax] = [0, 60];
  const [vndTotal, usdTotal] = [
    vndSubtotal + vndShipping + vndTax,
    usdSubtotal + usdShipping + usdTax,
  ];

  const [discountCode, setDiscountCode] = useState('');

  return (
    <Layout categories={categories}>
      <Head>
        <title>Shopping Cart – Fustic Store</title>
      </Head>

      <div className="cart-page">
        <div className="cart-entries scrollbar-visible">
          {cart.map((entry, i) => (
            <Fragment key={`${entry.product.id}${entry.sizeName}`}>
              {i !== 0 && <hr />}
              <CartProductSmall cartEntry={entry} noneditable />
            </Fragment>
          ))}
        </div>

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

        <div className="payment-button">
          <Button block solid>Payment</Button>
        </div>
      </div>

      <style jsx>
        {`
        .cart-page {
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

          .total, .discount-code, .payment-button {
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

          .payment-button {
            width: 100%;
            margin-top: 3rem;
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
            grid-template-areas:
              "cart-entries total"
              "cart-entries total"
              "cart-entries discount-code"
              "cart-entries payment-button";
            column-gap: 4em;

            padding-top: 12rem;
            max-width: 700px;

            .cart-entries {
              grid-area: cart-entries;
              max-height: 350px;
              overflow: auto;
              justify-self: right;
              align-self: start;
            }

            .total {
              grid-area: total;
              align-self: stretch;
              margin-top: 0;

              table {
                height: 100%;
              }
            }

            .discount-code {
              grid-area: discount-code;
              margin-top: 0;
            }

            .payment-button {
              grid-area: payment-button;
              margin-top: 0;
              align-self: end;
            }
          }
        }
        `}
      </style>
    </Layout>
  );
}

CartPage.propTypes = {
  categories: PropTypes.arrayOf(Category).isRequired,
};

export async function getStaticProps() {
  const categories = await getCategories();

  return {
    props: {
      categories,
    },
  };
}

export default CartPage;
