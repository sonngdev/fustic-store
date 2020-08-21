import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addToCart, minusFromCart, clearFromCart } from 'store/actions';
import Product from 'models/Product';
import { formatPriceVnd } from 'utils/string';
import Link from 'next/link';

export default function CartProductSmall({ cartEntry, noneditable }) {
  const { product, quantity, sizeName } = cartEntry;
  const thumbnail = product.images.find((image) => image.isThumbnail);

  const dispatch = useDispatch();
  const addProductToCart = () => dispatch(addToCart(product, sizeName));
  const minusProductFromCart = () => dispatch(minusFromCart(product, sizeName));
  const clearProductFromCart = () => dispatch(clearFromCart(product, sizeName));

  return (
    <div className="cart-product-small">
      <button type="button" className="remove-button" onClick={clearProductFromCart}>
        <img src="/icons/close.svg" alt="Remove item" />
      </button>

      <img className="image" src={thumbnail.url} alt={product.name} />

      <div className="info">
        <div className="name">
          <Link href={`/${product.category.slug}/${product.slug}`}>
            <a>
              {product.name}
            </a>
          </Link>
        </div>
        <div className="category-size">{product.category.singularName} • {sizeName}</div>
        {noneditable ? (
          <div className="quantity noneditable">
            {quantity}
          </div>
        ) : (
          <div className="quantity editable">
            <button type="button" className="minus" onClick={minusProductFromCart} disabled={quantity === 1}>-</button>
            <span>{quantity}</span>
            <button type="button" className="plus" onClick={addProductToCart}>+</button>
          </div>
        )}
        <div className="price">{formatPriceVnd(product.priceVnd)} VND • ${+product.priceUsd.toLocaleString()}</div>
      </div>

      <style jsx>
        {`
        .cart-product-small {
          display: grid;
          grid-template-columns: 10px 70px auto;
          column-gap: 6%;
          align-items: start;
          width: 100%;

          button {
            padding: 0;
          }

          .remove-button img {
            width: 10px;
            height: 10px;
          }

          .image {
            width: 70px;
            height: 90px;
            object-fit: cover;
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
              font-size: var(--fontsize-md);
              font-weight: var(--fontweight-semibold);

              &.editable {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 120px;

                .minus {
                  padding-right: 10px;
                }

                .plus {
                  padding-left: 10px;
                }
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
  noneditable: PropTypes.bool,
};

CartProductSmall.defaultProps = {
  noneditable: false,
};
