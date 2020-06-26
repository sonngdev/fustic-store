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

            .total {
              font-size: var(--fontsize-xs);
              text-align: right;
              text-transform: uppercase;
              line-height: 0.6rem;
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
            justify-content: flex-end;
            padding-top: calc(var(--height-brand) + 2 * var(--padding-header) + var(--spacing-xxl));
            width: 260px;
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
