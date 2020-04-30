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
    <Link href={`/${categorySlug}/${slug}`}>
      <a>
        <div className="site-product">
          <img src={thumbnail.url} alt={name} className="thumbnail" />
          <div className="name">{name}</div>
          <div className="price">
            {priceVnd.toLocaleString()}
            {' '}
            vnd / $
            {priceUsd.toLocaleString()}
          </div>

          <style jsx>
            {`
            .site-product {
              margin-bottom: var(--spacing-xl);
              text-align: center;

              &:hover .name {
                color: var(--color-accent);
              }

              .thumbnail {
                width: 240px;
                height: 320px;
                object-fit: cover;
                margin-bottom: var(--spacing-md);
              }

              .name {
                font-family: var(--font-heading);
                margin-bottom: var(--spacing-xs);
                font-weight: bold;
              }

              .price {
                font-family: var(--font-number);
              }
            }
            `}
          </style>
        </div>
      </a>
    </Link>
  );
}