export default function Cart() {
  return (
    <div className="cart">
      <div className="cart-container">
        <table>
          <thead>
            <tr>
              <th>Cart (1)</th>
              <th>420,000 vnd</th>
              <th>$20.00</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ACID TEE</td>
              <td>420,000</td>
              <td>20.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <style jsx>
        {`
        .cart {
          display: flex;

          font-family: var(--font-number);
          font-size: var(--fontsize-small);
          padding: 15px;

          @media screen and (min-width: 1200px) {
            justify-content: flex-end;
            padding-top: calc(var(--height-brand) + 2 * var(--padding-header) + var(--spacing-xxl));
            width: 260px;
          }

          table th, table td {
            height: calc(2 * var(--fontsize-small));

            &:first-child {
              text-align: left;
              width: 100px;
            }

            &:nth-child(2) {
              text-align: left;
              width: 90px;
            }

            &:last-child {
              text-align: right;
              width: 50px;
            }

            @media screen and (min-width: 1200px) {
              &:first-child {
                text-align: left;
                width: 80px;
              }

              &:nth-child(2) {
                text-align: left;
                width: 90px;
              }

              &:last-child {
                text-align: right;
                width: 50px;
              }
            }
          }
        }
        `}
      </style>
    </div>
  );
}
