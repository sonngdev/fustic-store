import CartProductSmall from 'components/product/cart-product-small';
import Button from 'components/basic/button';

export default function Cart() {
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

      <div className="items">
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
          display: grid;
          grid-template-rows: auto auto auto;

          .head {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            width: 100%;
            padding-bottom: var(--spacing-md);

            .count {
              font-size: smaller;
            }

            .total {
              font-size: var(--fontsize-small);
              text-align: right;
              text-transform: uppercase;
            }
          }

          .items {
            overflow: auto;
            margin-bottom: var(--spacing-lg);

            hr {
              margin: 2rem 0;

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
