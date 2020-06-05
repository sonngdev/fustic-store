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
            margin-bottom: var(--spacing-md);

            @media screen and (min-width: 1200px) {
              width: 222px;
              height: 296px;
            }
          }

          .name {
            font-family: var(--font-heading);
            margin-bottom: var(--spacing-xs);
            font-weight: bold;
          }

          .price {
            font-family: var(--font-number);
            color: var(--color-text);
          }
        }
        `}
      </style>
    </div>
  );
}
