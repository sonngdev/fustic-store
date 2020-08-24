import { useState } from 'react';
import Link from 'next/link';
import { formatPriceVnd } from 'utils/string';
import Product from 'models/Product';

export default function SiteProduct({ product }) {
  const {
    name,
    slug,
    images,
    category,
    priceVnd,
    priceUsd,
  } = product;
  const [hovered, setHovered] = useState(false);
  const thumbnail = images.find((image) => image.isThumbnail);
  const altThumbnail = images.find((image) => image.isAltThumbnail);

  return (
    <div
      className="site-product"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/${category.slug}/${slug}`}>
        <a>
          <div className="thumbnail-container">
            <img src={altThumbnail?.url} alt={name} className="alt-thumbnail" />
            <img src={thumbnail?.url} alt={name} className="thumbnail" />
          </div>
          <div className="info">
            <div className="name-category">
              {name}
              <br />
              {category.singularName}
            </div>

            <div className="price">{formatPriceVnd(priceVnd)} VND • ${+priceUsd.toLocaleString()}</div>
          </div>
        </a>
      </Link>

      <style jsx>
        {`
        .site-product {
          --thumbnail-width: 240px;
          --thumbnail-width: 320px;

          text-transform: uppercase;

          .thumbnail-container {
            width: var(--thumbnail-width);
            height: var(--thumbnail-height);
            position: relative;
            margin-bottom: 0.8rem;

            .thumbnail, .alt-thumbnail {
              width: var(--thumbnail-width);
              height: var(--thumbnail-height);
              object-fit: cover;
              margin: 0 auto;

              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
            }

            .thumbnail {
              opacity: ${hovered ? 0 : 1};
              transition: opacity ease-in-out 0.1s;
            }
          }

          .info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            margin: 0 auto;
            width: 240px;

            .name-category {
              font-size: var(--fontsize-sm);
              font-weight: var(--fontweight-bold);
              line-height: 0.95;
            }

            .price {
              font-size: var(--fontsize-lg);
              text-align: right;
            }
          }

          @media screen and (min-width: 768px) {
            --thumbnail-width: 270px;
            --thumbnail-height: 360px;

            .info {
              width: 270px;
            }
          }

          @media screen and (min-width: 1200px) {
            --thumbnail-width: 300px;
            --thumbnail-height: 400px;

            .info {
              width: 220px;

              .price {
                font-size: var(--fontsize-md);
              }
            }
          }

          @media screen and (min-width: 1800px) {
            --thumbnail-width: 420px;
            --thumbnail-height: 560px;

            .info {
              width: 400px;

              .name-category {
                font-size: 13px;
              }

              .price {
                font-size: 22px;
              }
            }
          }
        }
        `}
      </style>
    </div>
  );
}

SiteProduct.propTypes = {
  product: Product.isRequired,
};
