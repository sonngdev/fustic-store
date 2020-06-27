import Head from 'next/head';
import Layout from 'components/layout';
import CategoryName from 'components/category-name';
import ProductImages from 'components/product/product-images';
import Select from 'components/basic/select';
import Button from 'components/basic/button';

export default function Product({ product }) {
  return (
    <Layout>
      <Head>
        <title>{product.name} – {product.category.name} – Fustic Store</title>
      </Head>

      <div className="product">
        <ProductImages product={product} />

        <div className="product-orderer">
          <h2 className="name">{product.name}</h2>
          <div className="price">{product.priceVnd.toLocaleString()} vnd / ${product.priceUsd.toLocaleString()}</div>

          <div className="size">
            <label htmlFor="select">
              Size
              {' '}
              <Select id="select">
                {product.sizes.map((size) => (
                  <option value={size} key={size}>{size}</option>
                ))}
              </Select>
            </label>
            <span className="guide">H: &lt; 165cm</span>
          </div>

          <Button>Add To Cart</Button>
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

          .product-orderer {
            text-align: left;
            width: 100%;
            margin-top: var(--spacing-lg);
            padding: 0 var(--padding-page);

            .name {
              font-size: var(--fontsize-md);
              font-weight: normal;
              margin: 0 0 var(--spacing-xxs);
            }

            .price {
              font-weight: 900;
              margin-bottom: var(--spacing-md);
            }

            .size {
              margin-bottom: var(--spacing-xs);

              .guide {
                margin-left: var(--spacing-sm);
              }
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
