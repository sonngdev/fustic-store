import { useRef } from 'react';
import PropTypes from 'prop-types';

import useDisableBodyScroll from 'hooks/useDisableBodyScroll';
import CartProductSmall from 'components/product/cart-product-small';
import Button from 'components/basic/button';

export default function Cart({ visible }) {
  const itemList = useRef();

  useDisableBodyScroll(itemList.current, visible);

  return (
    <div className="cart">
      <div className="head">
        <div className="count">Cart (1)</div>
        <div className="total">
          Total
          <br />
          1.360.000 vnd • $56
        </div>
      </div>

      <div className="items scrollbar-visible" ref={itemList}>
        <hr />
        <CartProductSmall />
        <hr />
        <CartProductSmall />
        <hr />
        <CartProductSmall />
        <hr />
        <CartProductSmall />
        <hr />
        <CartProductSmall />
        <hr />
        <CartProductSmall />
        <hr />
        <CartProductSmall />
        <hr />
        <CartProductSmall />
        <hr />
        <CartProductSmall />
        <hr />
        <CartProductSmall />
        <hr />
        <CartProductSmall />
        <hr />
        <CartProductSmall />
      </div>

      <Button block>Check out</Button>

      <style jsx>
        {`
        .cart {
          padding: 15px;

          .head {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            width: 100%;
            padding-bottom: var(--spacing-sm);
            text-transform: uppercase;

            .total {
              font-size: var(--fontsize-xs);
              text-align: right;
              line-height: var(--lineheight-xs);
            }
          }

          .items {
            overflow: auto;
            padding-bottom: var(--spacing-md);
            margin-bottom: var(--spacing-md);
            max-height: calc(100vh - 200px);

            hr {
              margin: var(--spacing-lg) 0;

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
