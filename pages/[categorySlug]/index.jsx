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
  };

  const products = [
    {
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
    },
    {
      id: 2,
      categoryId: 1,
      categorySlug: params.categorySlug,
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

  return {
    props: {
      category,
      products,
      key: params.categorySlug,
    },
  };
}
