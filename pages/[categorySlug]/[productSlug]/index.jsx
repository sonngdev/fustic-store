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

          <div className="notes">
            <p>Do not wear this product with light colors to avoid color transfer</p>
            <p>Material: 100% cotton<br />Made in vietnam</p>
            <p>Model is 5’8” wearing a size large t-shirt</p>
          </div>
        </div>
      </div>

      <style jsx>
        {`
        .product {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;

          text-transform: uppercase;
          padding: 8rem var(--padding-page) 0;

          .product-orderer {
            text-align: left;
            width: 100%;
            margin-top: 2rem;

            .category {
              font-size: var(--fontsize-xs);
              font-weight: var(--fontweight-bold);
              margin-top: 0.3em;
            }

            .price {
              font-size: var(--fontsize-xl);
              margin-top: 0.35em;
            }

            .size-add {
              width: 205px;
              margin-top: 0.5em;

              :global(> :not(:first-child)) {
                margin-top: 0.8rem;
              }
            }

            .notes {
              font-size: var(--fontsize-xs);
              font-weight: var(--fontweight-bold);
              line-height: 0.95;
              width: 100%;

              margin-top: 4.8em;

              p {
                width: 180px;
                margin: 0 0 0.75em;
              }
            }
          }

          @media screen and (min-width: 992px) {
            flex-direction: row;
            justify-content: center;
            align-items: center;

            .product-orderer {
              padding: 0;
              margin-top: 0;
              margin-left: 4rem;
              width: 320px;
            }
          }

          @media screen and (min-width: 1200px) {
            padding-left: var(--width-menu);
            justify-content: flex-start;

            .product-orderer {
              margin-left: 150px;

              .name {
                font-size: var(--fontsize-lg);
              }

              .price {
                margin-top: 0.1em;
                font-size: var(--fontsize-xl);
              }

              .size-add {
                margin-top: 20px;

                :global(> :not(:first-child)) {
                  margin-top: 20px;
                }
              }

              .notes {
                margin-top: 60px;
              }
            }
          }

          @media screen and (min-width: 1600px) {
            .product-orderer {
              margin-left: 250px;
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
