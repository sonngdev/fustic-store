import Head from 'next/head';
import Layout from 'components/layout';
import CategoryName from 'components/category-name';
import ProductGrid from 'components/product/product-grid';
import SiteProduct from 'components/product/site-product';

export default function Category({ category, products }) {
  return (
    <Layout>
      <Head>
        <title>{category.name} – Fustic Store</title>
      </Head>

      <CategoryName category={category} />

      <div className="category">
        <ProductGrid>
          {products.map((product) => <SiteProduct product={product} key={product.slug} />)}
        </ProductGrid>
      </div>

      <style jsx>
        {`
        .category {
          width: 100%;

          @media screen and (min-width: 1200px) {
            padding-left: var(--width-menu);
          }
        }
        `}
      </style>
    </Layout>
  );
}

// GET /categories
export async function getStaticPaths() {
  return {
    paths: [
      { params: { categorySlug: 't-shirts' } },
      { params: { categorySlug: 'sweaters' } },
      { params: { categorySlug: 'hoodies' } },
      { params: { categorySlug: 'prints' } },
    ],
    fallback: false,
  };
}

// GET /categories/:slug
// GET /categories/:slug/products
export async function getStaticProps({ params }) {
  const category = {
    id: 1,
    name: params.categorySlug,
    slug: params.categorySlug,
    singularName: params.categorySlug,
  };

  const products = [
    {
      id: 1,
      category,
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
      category,
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

  return {
    props: {
      category,
      products,
      key: params.categorySlug,
    },
  };
}
