import { useState } from 'react';
import cx from 'classnames';

const allSizes = ['S', 'M', 'L', 'XL', 'XXL'];

function ProductSizeSelector({ sizes }) {
  const [selected, setSelected] = useState(sizes[0]);

  return (
    <div className="product-size-selector">
      {
        allSizes.map((size) => (
          <button
            type="button"
            disabled={!sizes.includes(size)}
            className={cx({ active: size === selected })}
            onClick={() => setSelected(size)}
          >
            {size}
          </button>
        ))
      }

      <style jsx>
        {`
        .product-size-selector {
          width: 100%;
          display: flex;
          justify-content: space-between;

          button {
            font-weight: var(--fontweight-thin);
            border: solid 1px rgba(255, 255, 255, 0.4);
            width: 32px;
            height: 32px;
            padding: 0;
            transition: ease 0.2s;
            transition-property: border, font-weight;

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

export default ProductSizeSelector;
