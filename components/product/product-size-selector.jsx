import { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function ProductSizeSelector({ sizes }) {
  const sizesInStock = sizes.filter((s) => s.inStock);
  const [selected, setSelected] = useState(sizesInStock[0]);

  return (
    <div className="product-size-selector">
      {
        sizes.map((size) => (
          <button
            key={size.name}
            type="button"
            disabled={!sizesInStock.includes(size)}
            className={cx({ active: size === selected })}
            onClick={() => setSelected(size)}
          >
            {size.name}
          </button>
        ))
      }

      <style jsx>
        {`
        .product-size-selector {
          width: 205px;

          button {
            font-weight: var(--fontweight-thin);
            border: solid 1px rgba(255, 255, 255, 0.4);
            width: 32px;
            height: 32px;
            padding: 0;
            transition: ease 0.2s;
            transition-property: border, font-weight;

            &:not(:last-of-type) {
              margin-right: 11px;
            }

            :disabled {
              opacity: 0.2;
              cursor: not-allowed;
            }

            &.active {
              border: solid 1px var(--color-text);
              font-weight: var(--fontweight-semibold);
            }
          }
        }
        `}
      </style>
    </div>
  );
}

ProductSizeSelector.propTypes = {
  sizes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      inStock: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

export default ProductSizeSelector;
