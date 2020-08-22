import { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { getCartTotal, getCartQuantity } from 'utils/checkout';
import { useCart } from 'hooks/store';
import useDisableBodyScroll from 'hooks/useDisableBodyScroll';
import CartProductSmall from 'components/product/cart-product-small';
import Button from 'components/basic/button';

export default function Cart({ visible }) {
  const cart = useCart();
  const [vndTotal, usdTotal] = getCartTotal(cart);

  const itemList = useRef();
  useDisableBodyScroll(itemList.current, visible);

  return (
    <div className="cart">
      <div className="head">
        <div className="count">Cart ({getCartQuantity(cart)})</div>
        <div className="total">
          Total
          <br />
          {vndTotal.toLocaleString()} vnd • ${usdTotal.toLocaleString()}
        </div>
      </div>

      <div className="items scrollbar-visible" ref={itemList}>
        {cart.map((entry) => (
          <Fragment key={`${entry.product.id}${entry.sizeName}`}>
            <hr />
            <CartProductSmall cartEntry={entry} />
          </Fragment>
        ))}
      </div>

      <Link href="/checkout/summary">
        <Button block disabled={!cart.length}>Check out</Button>
      </Link>

      <style jsx>
        {`
        .cart {
          padding: 15px;

          .head {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            width: 100%;
            padding-bottom: 0.8em;
            text-transform: uppercase;

            .total {
              font-size: var(--fontsize-xs);
              text-align: right;
              line-height: 0.95;
            }
          }

          .items {
            overflow: auto;
            padding-bottom: 1.2em;
            margin-bottom: 1.2em;
            max-height: calc(100vh - 200px);

            hr {
              margin: 2rem 0;

              &:first-of-type {
                margin-top: 0;
              }
            }
          }

          @media screen and (min-width: 1200px) {
            background-color: var(--color-background);
            padding: var(--padding-header);

            .head {
              padding-bottom: 1.5rem;

              .count {
                font-size: var(--fontsize-lg);
              }
            }

            .items {
              margin-bottom: 2rem;

              hr {
                margin: 2.5rem 0;
              }
            }
          }
        }
        `}
      </style>
    </div>
  );
}

Cart.propTypes = {
  visible: PropTypes.bool.isRequired,
};
