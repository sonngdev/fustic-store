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

      <style jsx>
        {`
        .cart {
          display: flex;
          padding: 15px;

          .head {
            display: grid;
            grid-template-columns: 1fr 1fr;
            width: 100%;

            .count {
              font-size: smaller;
            }

            .total {
              font-size: var(--fontsize-small);
              text-align: right;
              text-transform: uppercase;
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
