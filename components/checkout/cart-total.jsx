import { useState, useEffect } from 'react';
import { getCartTotal } from 'utils/checkout';
import { getGeneralConfig } from 'utils/request';
import { useCart, useCheckoutInfo } from 'hooks/store';

function useSubtotals() {
  const cart = useCart();
  return getCartTotal(cart);
}

function useShippingFees() {
  const checkoutInfo = useCheckoutInfo();

  /**
   * Using undefined so mathematical operations will result in NaN
   * If null is used instead, it will be treated as 0 in math operations
   */
  const [shippingVnd, setShippingVnd] = useState(undefined);
  const [shippingUsd, setShippingUsd] = useState(undefined);

  useEffect(() => {
    const request = async () => {
      const { shippingFeeVnd, shippingFeeUsd } = await getGeneralConfig();
      setShippingVnd(shippingFeeVnd);
      setShippingUsd(shippingFeeUsd);
    };
    request();
  }, []);

  if (!shippingVnd || !shippingUsd) return [undefined, undefined];
  if (!checkoutInfo.country) return [undefined, undefined];
  if (checkoutInfo.country === 'Vietnam') return [shippingVnd, undefined];
  return [undefined, shippingUsd];
}

function CartTotal() {
  const [subtotalVnd, subtotalUsd] = useSubtotals();
  const [shippingVnd, shippingUsd] = useShippingFees();
  const [discountVnd, discountUsd] = [0, 0];
  const [totalVnd, totalUsd] = [
    subtotalVnd + shippingVnd - discountVnd,
    subtotalUsd + shippingUsd - discountUsd,
  ];

  const [discountCode, setDiscountCode] = useState('');

  return (
    <article className="cart-total">
      <table>
        <tbody>
          <tr>
            <th>Subtotal</th>
            <td>{subtotalVnd.toLocaleString()} vnd</td>
            <td>${subtotalUsd.toLocaleString()}</td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>{shippingVnd ? `${shippingVnd.toLocaleString()} vnd` : '–'}</td>
            <td>{shippingUsd ? `$${shippingUsd.toLocaleString()}` : '–'}</td>
          </tr>
          <tr>
            <th>Discount</th>
            <td>{discountVnd.toLocaleString()} vnd</td>
            <td>${discountUsd.toLocaleString()}</td>
          </tr>
          <tr />
          <tr>
            <th>Total</th>
            <td>{totalVnd ? `${totalVnd.toLocaleString()} vnd` : '–'}</td>
            <td>{totalUsd ? `$${totalUsd.toLocaleString()}` : '–'}</td>
          </tr>
        </tbody>
      </table>

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

      <style jsx>
        {`
        .cart-total {
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

          @media screen and (min-width: 375px) {
            table tr > :last-child {
              padding-left: 14%;
            }
          }

          @media screen and (min-width: 768px) {
            .discount-code {
              margin-top: 1.5em;
            }
          }
        }
        `}
      </style>
    </article>
  );
}

export default CartTotal;
