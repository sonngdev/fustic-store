import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addToCart } from 'store/actions';
import Product from 'models/Product';

function AddToCartButton({ product, size }) {
  const dispatch = useDispatch();
  const cannotAdd = !size || !size.inStock;

  const addProductToCart = () => {
    if (cannotAdd) return;
    dispatch(addToCart(product, size.name));
  };

  return (
    <button
      type="button"
      className="add-to-cart"
      onClick={addProductToCart}
      disabled={cannotAdd}
    >
      <span>
        <img src="/eye.png" alt="Eye" />
        Add to cart
      </span>

      <style jsx>
        {`
        .add-to-cart {
          width: 205px;
          border: solid 1px var(--color-text);
          padding: 12px;
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

          &:disabled {
            opacity: 0.2;
            cursor: not-allowed;
          }

          span {
            display: grid;
            grid-template-columns: 45px auto;
            justify-content: center;
            align-items: center;

            img {
              width: 30px;
            }
          }

          @media screen and (min-width: 1200px) {
            font-size: var(--fontsize-lg);
            padding: 20px;
            width: 295px;

            span {
              grid-template-columns: 60px auto;

              img {
                width: 40px;
              }
            }
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
    name: PropTypes.string.isRequired,
    inStock: PropTypes.bool.isRequired,
  }),
};

AddToCartButton.defaultProps = {
  size: null,
};

export default AddToCartButton;
