import { useState } from 'react';
import cx from 'classnames';
import AddToCartButton from 'components/product/add-to-cart-button';
import { formatPriceVnd } from 'utils/string';
import useCanAddMoreProduct from 'hooks/useCanAddMoreProduct';
import Product from 'models/Product';

function ProductOrderer({ product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes.find((s) => s.inStock));

  const canAddMoreProduct = useCanAddMoreProduct(product, selectedSize?.name);
  const selectSize = (size) => () => {
    if (!size.inStock) return;
    setSelectedSize(size);
  };

  return (
    <div className="product-orderer">
      <div className="name">{product.name}</div>
      <div className="category">{product.category.singularName}</div>
      <div className="price">{formatPriceVnd(product.priceVnd)} VND • ${+product.priceUsd.toLocaleString()}</div>

      <div className="size-add">
        <div className="size">
          {
            product.sizes.map((size) => (
              <button
                key={size.name}
                type="button"
                disabled={!size.inStock}
                className={cx({ active: size === selectedSize })}
                onClick={selectSize(size)}
              >
                {size.name}
              </button>
            ))
          }
        </div>

        <AddToCartButton
          product={product}
          size={selectedSize}
          disabled={!selectedSize?.inStock || !canAddMoreProduct}
        />
      </div>

      <div className="notes">
        <p>Do not wear this product with light colors to avoid color transfer</p>
        <p>Material: 100% cotton<br />Made in vietnam</p>
      </div>

      <style jsx>
        {`
        .product-orderer {
          text-align: left;
          width: 100%;
          margin-top: 2rem;

          .category {
            font-size: var(--fontsize-xs);
            font-weight: var(--fontweight-bold);
            margin-top: 0.3em;
          }

          .price {
            font-size: var(--fontsize-xl);
            margin-top: 0.35em;
          }

          .size-add {
            width: 16.4em;
            margin-top: 0.5em;

            :global(> :not(:first-child)) {
              margin-top: 0.8rem;
            }

            .size {
              width: 16.4em;

              button {
                font-weight: var(--fontweight-thin);
                border: solid 1px rgba(255, 255, 255, 0.4);
                width: 2.56em;
                height: 2.56em;
                padding: 0;
                transition: ease 0.2s;
                transition-property: border, font-weight;

                &:not(:last-of-type) {
                  margin-right: calc((16.4em - 2.56em * 5) / 4);
                }

                &.active {
                  border: solid 1px var(--color-text);
                  font-weight: var(--fontweight-semibold);
                }
              }
            }
          }

          .notes {
            font-size: var(--fontsize-xs);
            font-weight: var(--fontweight-bold);
            line-height: 0.95;
            width: 100%;

            margin-top: 4.8em;

            p {
              width: 180px;
              margin: 0 0 0.75em;
            }
          }

          @media screen and (min-width: 992px) {
            padding: 0;
            margin-top: 0;
            margin-left: 4rem;
            width: max-content;
          }

          @media screen and (min-width: 1200px) {
            margin-left: 150px;

            .name {
              font-size: var(--fontsize-lg);
            }

            .price {
              margin-top: 0.1em;
              font-size: var(--fontsize-xl);
            }

            .size-add {
              margin-top: 20px;

              :global(> :not(:first-child)) {
                margin-top: 20px;
              }
            }

            .notes {
              margin-top: 60px;
            }
          }

          @media screen and (min-width: 1800px) {
            margin-left: 250px;
          }
        }
        `}
      </style>
    </div>
  );
}

ProductOrderer.propTypes = {
  product: Product.isRequired,
};

export default ProductOrderer;
