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
            margin-bottom: var(--spacing-sm);

            @media screen and (min-width: 768px) {
              width: 300px;
              height: 400px;
            }

            @media screen and (min-width: 1200px) {
              width: 222px;
              height: 296px;
            }

            @media screen and (min-width: 1600px) {
              width: 360px;
              height: 450px;
            }
          }

          .info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;

            .name-category {
              font-size: var(--fontsize-sm);
              font-weight: var(--fontweight-bold);
              line-height: 0.75rem;
            }

            .price {
              font-size: var(--fontsize-lg);
              text-align: right;
            }
          }
        }
        `}
      </style>
    </div>
  );
}
