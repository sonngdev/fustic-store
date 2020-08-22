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
          grid-template-columns: calc(var(--fontsize-md) * 0.8) calc(var(--fontsize-md) * 5.6) auto;
          column-gap: 6%;
          align-items: start;
          width: 100%;

          button {
            padding: 0;
          }

          .remove-button img {
            width: calc(var(--fontsize-md) * 0.8);
            height: calc(var(--fontsize-md) * 0.8);
          }

          .image {
            width: calc(var(--fontsize-md) * 5.6);
            height: calc(var(--fontsize-md) * 7.2);
            object-fit: cover;
          }

          .info {
            text-transform: uppercase;
            width: max-content;

            .name {
              margin-bottom: 0.9rem;
            }

            .category-size {
              font-size: var(--fontsize-xs);
              margin-bottom: 1.1rem;
            }

            .quantity {
              font-size: calc(var(--fontsize-md) * 1.3);
              font-weight: var(--fontweight-semibold);
              margin-bottom: 0.9rem;

              &.editable {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: calc(var(--fontsize-md) * 9.6);

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
