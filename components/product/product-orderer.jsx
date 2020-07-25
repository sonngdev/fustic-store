import ProductSizeSelector from 'components/product/product-size-selector';
import AddToCartButton from 'components/product/add-to-cart-button';
import { formatPriceVnd } from 'utils/string';
import Product from 'models/Product';

function ProductOrderer({ product }) {
  return (
    <div className="product-orderer">
      <div className="name">{product.name}</div>
      <div className="category">{product.category.singularName}</div>
      <div className="price">{formatPriceVnd(product.priceVnd)} VND • ${+product.priceUsd.toLocaleString()}</div>

      <div className="size-add">
        <ProductSizeSelector sizes={product.sizes} />
        <AddToCartButton product={product} />
      </div>

      <div className="notes">
        <p>Do not wear this product with light colors to avoid color transfer</p>
        <p>Material: 100% cotton<br />Made in vietnam</p>
        <p>Model is 5’8” wearing a size large t-shirt</p>
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
            width: 205px;
            margin-top: 0.5em;

            :global(> :not(:first-child)) {
              margin-top: 0.8rem;
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

          @media screen and (min-width: 1600px) {
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
