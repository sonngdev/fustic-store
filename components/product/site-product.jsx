import Link from 'next/link';

export default function SiteProduct({ product }) {
  const {
    name,
    slug,
    images,
    categorySlug,
    priceVnd,
    priceUsd,
  } = product;
  const thumbnail = images.find((image) => image.isThumbnail);

  return (
    <div className="site-product">
      <Link href={`/${categorySlug}/${slug}`}>
        <a>
          <img src={thumbnail.url} alt={name} className="thumbnail" />
          <div className="name">{name}</div>
          <div className="price">{priceVnd.toLocaleString()} vnd / ${priceUsd.toLocaleString()}</div>
        </a>
      </Link>

      <style jsx>
        {`
        .site-product {
          text-align: center;

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

          .name {
            margin-bottom: var(--spacing-xxs);
            font-weight: bold;
          }

          .price {
            color: var(--color-text);
          }
        }
        `}
      </style>
    </div>
  );
}
