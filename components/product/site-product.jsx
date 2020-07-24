import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { formatPriceVnd } from 'utils/string';

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
          <img src={thumbnail?.url} alt={name} className="thumbnail" />
          <img src={altThumbnail?.url} alt={name} className="alt-thumbnail" />
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
          text-transform: uppercase;

          .thumbnail, .alt-thumbnail {
            width: 240px;
            height: 320px;
            object-fit: cover;
            margin: 0 auto;
            margin-bottom: 0.8rem;
          }

          .thumbnail {
            display: ${hovered ? 'none' : 'block'};
          }

          .alt-thumbnail {
            display: ${hovered ? 'block' : 'none'};
          }

          .info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            margin: 0 auto;

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
            .thumbnail, .alt-thumbnail {
              width: 270px;
              height: 360px;
            }

            .info {
              width: 270px;
            }
          }

          @media screen and (min-width: 1200px) {
            .thumbnail, .alt-thumbnail {
              width: 300px;
              height: 400px;
            }

            .info {
              width: 220px;

              .price {
                font-size: var(--fontsize-md);
              }
            }
          }

          @media screen and (min-width: 1600px) {
            .thumbnail, .alt-thumbnail {
              width: 420px;
              height: 560px;
            }
          }
        }
        `}
      </style>
    </div>
  );
}

SiteProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    priceVnd: PropTypes.number.isRequired,
    priceUsd: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    category: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      singularName: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    }),
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        isThumbnail: PropTypes.bool.isRequired,
        isAltThumbnail: PropTypes.bool.isRequired,
        createdAt: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
};
