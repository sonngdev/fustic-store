import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addToCart } from 'store/actions';
import Product from 'models/Product';

function AddToCartButton({ product, size, disabled }) {
  const dispatch = useDispatch();

  const addProductToCart = () => {
    if (disabled) return;
    dispatch(addToCart(product, size.name));
  };

  return (
    <button
      type="button"
      className="add-to-cart"
      onClick={addProductToCart}
      disabled={disabled}
    >
      <span className="inner">
        <img src="/eye.png" alt="Eye" />
        <span className="text">Add to cart</span>
      </span>

      <style jsx>
        {`
        .add-to-cart {
          width: 16.4em;
          border: solid 1px var(--color-text);
          padding: 1em;
          text-transform: uppercase;

          &:enabled {
            transition: all ease 0.2s;

            &:hover {
              background-color: var(--color-text);
              color: var(--color-background);
              font-weight: var(--fontweight-bold);

              img {
                filter: invert(100%);
              }
            }
          }

          .inner {
            display: grid;
            grid-template-columns: 2.4em 6.7em;
            column-gap: 1em;
            justify-content: center;
            align-items: center;

            img {
              width: 2.4em;
            }
          }

          @media screen and (min-width: 1200px) {
            font-size: var(--fontsize-lg);
            padding: 1.1em;
            width: 16.4em;
          }
        }
        `}
      </style>
    </button>
  );
}

AddToCartButton.propTypes = {
  product: Product.isRequired,
  size: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }),
  disabled: PropTypes.bool,
};

AddToCartButton.defaultProps = {
  size: null,
  disabled: false,
};

export default AddToCartButton;
