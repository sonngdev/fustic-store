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
      <img src={thumbnail.url} alt={name} className="thumbnail" />
      <Link href={`/${categorySlug}/${slug}`}><a className="name">{name}</a></Link>
      <p className="price">{priceVnd.toLocaleString()} vnd / ${priceUsd.toLocaleString()}</p>

      <style jsx>
        {`
        .site-product {
          margin-bottom: 3rem;
          text-align: center;

          .thumbnail {
            width: 240px;
            height: 320px;
            object-fit: cover;
            margin-bottom: 0.5rem;
          }

          .name {
            display: block;
            font-family: var(--heading-font);
          }

          .price {
            font-family: var(--number-font);
          }
        }
        `}
      </style>
    </div>
  );
}
