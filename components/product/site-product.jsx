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
  const thumbnail = images.find((image) => image.isThumbnail);

  return (
    <div className="site-product">
      <Link href={`/${category.slug}/${slug}`}>
        <a>
          <img src={thumbnail.url} alt={name} className="thumbnail" />
          <div className="info">
            <div className="name-category">
              {name}
              <br />
              {category.singularName}
            </div>

            <div className="price">{formatPriceVnd(priceVnd)} VND • ${priceUsd.toLocaleString()}</div>
          </div>
        </a>
      </Link>

      <style jsx>
        {`
        .site-product {
          text-transform: uppercase;

          .thumbnail {
            width: 240px;
            height: 320px;
            object-fit: cover;
            display: block;
            margin: 0 auto;
            margin-bottom: 0.8rem;
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
            .thumbnail {
              width: 270px;
              height: 360px;
            }

            .info {
              width: 250px;
            }
          }

          @media screen and (min-width: 1200px) {
            .thumbnail {
              width: 300px;
              height: 400px;
            }

            .info {
              width: 200px;

              .price {
                font-size: var(--fontsize-md);
              }
            }
          }

          @media screen and (min-width: 1600px) {
            .thumbnail {
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
