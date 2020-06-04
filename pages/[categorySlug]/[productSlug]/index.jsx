import Head from 'next/head';
import Layout from 'components/layout';
import CategoryName from 'components/category-name';
import ProductImages from 'components/product-images';
import Select from 'components/select';
import Button from 'components/button';

export default function Product({ category, product }) {
  return (
    <Layout>
      <Head>
        <title>{product.name} – {category.name} – Not At All Clothing</title>
      </Head>

      <CategoryName category={category} />

      <ProductImages product={product} />

      <div className="product">
        <h2 className="name">{product.name}</h2>
        <div className="price">{product.priceVnd.toLocaleString()} vnd / ${product.priceUsd.toLocaleString()}</div>

        <div style={{ marginBottom: 'var(--spacing-sm)' }}>
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

      <style jsx>
        {`
        .product {
          text-align: left;
          width: 100%;
          margin-top: var(--spacing-lg);
          padding: 0 var(--padding-page) 0;

          .name {
            font-size: var(--fontsize-normal);
            font-weight: normal;
            margin: 0 0 var(--spacing-sm);
          }

          .price {
            color: var(--color-accent);
            font-family: var(--font-number);
            margin-bottom: var(--spacing-md);
          }

          .guide {
            margin-left: var(--spacing-md);
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
      categoryId: 1,
      categorySlug: 't-shirts',
      name: 'ACID TEE',
      slug: 'acid-tee',
      images: [
        {
          url: 'http://via.placeholder.com/240x320',
          isThumbnail: true,
        },
        {
          url: 'http://via.placeholder.com/240x320',
          isThumbnail: false,
        },
      ],
      priceVnd: 420000,
      priceUsd: 20,
      sizes: ['S', 'M', 'L'],
    },
    {
      id: 2,
      categoryId: 1,
      categorySlug: 't-shirts',
      name: 'DOPE ACID TEE',
      slug: 'dope-acid-tee',
      images: [
        {
          url: 'http://via.placeholder.com/240x320',
          isThumbnail: true,
        },
        {
          url: 'http://via.placeholder.com/240x320',
          isThumbnail: false,
        },
      ],
      priceVnd: 420000,
      priceUsd: 20,
      sizes: ['S', 'M', 'L'],
    },
  ];

  const categorySlugs = new Set(products.map((product) => product.categorySlug));
  const paths = [...categorySlugs].reduce((acc, categorySlug) => {
    const prods = products.filter((product) => product.categorySlug === categorySlug);
    const ps = prods.map((prod) => ({ params: { categorySlug, productSlug: prod.slug } }));
    return [...acc, ...ps];
  }, []);

  return {
    paths,
    fallback: false,
  };
}

// GET /categories/:slug
// GET /categories/:category_slug/products/:slug
export async function getStaticProps({ params }) {
  const category = {
    id: 1,
    name: params.categorySlug,
    slug: params.categorySlug,
  };

  const product = {
    id: 1,
    categoryId: 1,
    categorySlug: params.categorySlug,
    name: 'ACID TEE',
    slug: 'acid-tee',
    images: [
      {
        url: 'http://via.placeholder.com/240x320',
        isThumbnail: true,
      },
      {
        url: 'http://via.placeholder.com/240x320',
        isThumbnail: false,
      },
    ],
    priceVnd: 420000,
    priceUsd: 20,
    sizes: ['S', 'M', 'L'],
  };

  return {
    props: {
      category,
      product,
    },
  };
}
