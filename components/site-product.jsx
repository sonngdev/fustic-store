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
          <p className="name">{name}</p>
          <p className="price">
            {priceVnd.toLocaleString()}
            {' '}
            vnd / $
            {priceUsd.toLocaleString()}
          </p>

          <style jsx>
            {`
            .site-product {
              margin-bottom: 3rem;
              text-align: center;

              &:hover .name {
                color: var(--color-accent);
              }

              .thumbnail {
                width: 240px;
                height: 320px;
                object-fit: cover;
                margin-bottom: 0.8rem;
              }

              .name {
                font-family: var(--font-heading);
                margin-bottom: 0.3rem;
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
