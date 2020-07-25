import PropTypes from 'prop-types';
import Product from 'models/Product';
import { formatPriceVnd } from 'utils/string';

export default function CartProductSmall({ cartEntry }) {
  const { product, quantity, sizeName } = cartEntry;

  return (
    <div className="cart-product-small">
      <button type="button" className="remove-button">
        <img src="/icons/close.svg" alt="Remove item" />
      </button>

      <img className="image" src="https://cdn.shopify.com/s/files/1/0186/4545/0816/products/CFSS20FLAT_48_600x.png?v=1589340501" alt="Hoodie" />

      <div className="info">
        <div className="name">{product.name}</div>
        <div className="category-size">{product.category.singularName} • {sizeName}</div>
        <div className="quantity">
          <button type="button" className="minus">-</button>
          <span>{quantity}</span>
          <button type="button" className="plus">+</button>
        </div>
        <div className="price">{formatPriceVnd(product.priceVnd)} VND • ${+product.priceUsd.toLocaleString()}</div>
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

            > *:not(:last-child) {
              margin-bottom: 0.8em;
            }

            .category-size {
              font-size: var(--fontsize-xs);
            }

            .quantity {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 120px;
              font-size: var(--fontsize-md);
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

CartProductSmall.propTypes = {
  cartEntry: PropTypes.shape({
    product: Product.isRequired,
    quantity: PropTypes.number.isRequired,
    sizeName: PropTypes.string.isRequired,
  }).isRequired,
};
