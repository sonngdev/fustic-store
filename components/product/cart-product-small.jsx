export default function CartProductSmall() {
  return (
    <div className="cart-product-small">
      <button type="button" className="remove-button">
        <img src="/icons/close.svg" alt="Remove item" />
      </button>

      <img className="image" src="https://cdn.shopify.com/s/files/1/0186/4545/0816/products/CFSS20FLAT_48_600x.png?v=1589340501" alt="Hoodie" />

      <div className="info">
        <div className="name">Batherope kids tee</div>
        <div className="category-size">T-Shirt • S</div>
        <div className="quantity">
          <button type="button" className="minus">-</button>
          <span>1</span>
          <button type="button" className="plus">+</button>
        </div>
        <div className="price">420k vnd • $20</div>
      </div>

      <style jsx>
        {`
        .cart-product-small {
          display: grid;
          grid-template-columns: 10px 90px auto;
          align-items: start;

          button {
            padding: 0;
          }

          .remove-button img {
              width: 10px;
              height: 10px;
          }

          .image {
            width: 90px;
            height: 90px;
          }

          .info {
            text-transform: uppercase;
            font-size: smaller;

            > *:not(:last-child) {
              margin-bottom: var(--spacing-md);
            }

            .name {
              margin-bottom: var(--spacing-sm);
            }

            .category-size {
              font-size: var(--fontsize-small);
            }

            .quantity {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 120px;
              font-size: var(--fontsize-normal);
              font-weight: var(--fontweight-semibold);

              .minus {
                padding-right: 10px;
              }

              .plus {
                padding-left: 10px;
              }
            }
          }
        }
        `}
      </style>
    </div>
  );
}
