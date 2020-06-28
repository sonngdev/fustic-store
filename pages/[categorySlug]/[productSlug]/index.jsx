import Head from 'next/head';
import Layout from 'components/layout';
import ProductImages from 'components/product/product-images';
import ProductSizeSelector from 'components/product/product-size-selector';
import AddToCartButton from 'components/product/add-to-cart-button';
import { formatPriceVnd } from 'utils/string';

export default function Product({ product }) {
  return (
    <Layout>
      <Head>
        <title>{product.name} – {product.category.name} – Fustic Store</title>
      </Head>

      <div className="product">
        <ProductImages product={product} />

        <div className="product-orderer">
          <div className="name">{product.name}</div>
          <div className="category">{product.category.singularName}</div>
          <div className="price">{formatPriceVnd(product.priceVnd)} VND • ${product.priceUsd.toLocaleString()}</div>

          <div className="size-add">
            <ProductSizeSelector sizes={product.sizes} />
            <AddToCartButton />
          </div>
        </div>

        <div className="notes">
          <p>Do not wear this product with light colors to avoid color transfer</p>
          <p>Material: 100% cotton<br />Made in vietnam</p>
          <p>Model is 5’8” wearing a size large t-shirt</p>
        </div>
      </div>

      <style jsx>
        {`
        .product {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;

          margin-top: var(--spacing-xl);
          text-transform: uppercase;
          padding: 0 var(--padding-page);

          .product-orderer {
            text-align: left;
            width: 100%;
            margin-top: var(--spacing-lg);

            .category {
              font-size: var(--fontsize-xs);
              font-weight: var(--fontweight-bold);
              margin-top: var(--spacing-xxxs);
            }

            .price {
              font-size: var(--fontsize-xl);
              margin-top: var(--spacing-sm);
            }

            .size-add {
              width: 205px;
              margin-top: var(--spacing-xs);

              :global(> :not(:first-child)) {
                margin-top: var(--spacing-sm);
              }
            }
          }

          .notes {
            font-size: var(--fontsize-xs);
            font-weight: var(--fontweight-bold);
            line-height: var(--lineheight-xs);
            width: 100%;

            margin-top: var(--spacing-xl);

            p {
              width: 180px;
              margin: 0 0 var(--spacing-xs);
            }
          }

          @media screen and (min-width: 1200px) {
            flex-direction: row;
            align-items: flex-start;

            .product-orderer {
              padding: 0;
              margin-top: 0;
              margin-left: var(--spacing-xxl);
            }
          }

          @media screen and (min-width: 1400px) {
            .product-orderer {
              margin-left: var(--spacing-xxxl);
            }
          }
        }
        `}
      </style>
    </Layout>
  );
}

// GET /products
export async function getStaticPaths() {
  const products = [
    {
      id: 1,
      category: {
        id: 1,
        slug: 't-shirts',
        name: 'T-Shirts',
        singularName: 'T-Shirt',
      },
      name: 'BATHEROPE KIDS',
      slug: 'batherobe-kids',
      images: [
        {
          url: 'https://cdn.shopify.com/s/files/1/0186/4545/0816/products/CFSS20FLAT_48_600x.png?v=1589340501',
          isThumbnail: true,
        },
        {
          url: 'https://cdn.shopify.com/s/files/1/0186/4545/0816/products/CFSS20FLAT_48_600x.png?v=1589340501',
          isThumbnail: false,
        },
      ],
      priceVnd: 420000,
      priceUsd: 20,
      sizes: ['S', 'M', 'L'],
    },
    {
      id: 2,
      category: {
        id: 1,
        slug: 't-shirts',
        name: 'T-Shirts',
        singularName: 'T-Shirt',
      },
      name: 'DOPE BATHEROPE KIDS',
      slug: 'dope-batherope-kids',
      images: [
        {
          url: 'https://cdn.shopify.com/s/files/1/0186/4545/0816/products/CFSS20FLAT_48_600x.png?v=1589340501',
          isThumbnail: true,
        },
        {
          url: 'https://cdn.shopify.com/s/files/1/0186/4545/0816/products/CFSS20FLAT_48_600x.png?v=1589340501',
          isThumbnail: false,
        },
      ],
      priceVnd: 420000,
      priceUsd: 20,
      sizes: ['S', 'M', 'L'],
    },
  ];

  const categorySlugs = new Set(products.map((product) => product.category.slug));
  const paths = [...categorySlugs].reduce((acc, categorySlug) => {
    const prods = products.filter((product) => product.category.slug === categorySlug);
    const ps = prods.map((prod) => ({ params: { categorySlug, productSlug: prod.slug } }));
    return acc.concat(ps);
  }, []);

  return {
    paths,
    fallback: false,
  };
}

// GET /categories/:slug
// GET /categories/:category_slug/products/:slug
export async function getStaticProps({ params }) {
  const product = {
    id: 1,
    category: {
      id: 1,
      slug: 't-shirts',
      name: 'T-Shirts',
      singularName: 'T-Shirt',
    },
    name: 'BATHEROPE KIDS',
    slug: 'batherobe-kids',
    images: [
      {
        url: 'https://cdn.shopify.com/s/files/1/0186/4545/0816/products/CFSS20FLAT_48_600x.png?v=1589340501',
        isThumbnail: true,
      },
      {
        url: 'https://cdn.shopify.com/s/files/1/0186/4545/0816/products/CFSS20FLAT_48_600x.png?v=1589340501',
        isThumbnail: false,
      },
    ],
    priceVnd: 420000,
    priceUsd: 20,
    sizes: ['S', 'M', 'L'],
  };

  return {
    props: {
      product,
    },
  };
}
