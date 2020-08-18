import { useState } from 'react';
import { getCartTotal } from 'utils/checkout';
import { useCart } from 'hooks/store';

function CartTotal() {
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
    <article className="cart-total">
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
