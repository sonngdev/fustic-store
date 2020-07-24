import PropTypes from 'prop-types';
import Head from 'next/head';
import Layout from 'components/layout';
import ProductGrid from 'components/product/product-grid';
import SiteProduct from 'components/product/site-product';
import { get, getCategories } from 'utils/request';

export default function Category({ category, products }) {
  return (
    <Layout>
      <Head>
        <title>{category.name} – Fustic Store</title>
      </Head>

      <div className="category">
        <ProductGrid>
          {products.map((product) => <SiteProduct product={product} key={product.slug} />)}
        </ProductGrid>
      </div>

      <style jsx>
        {`
        .category {
          width: 100%;
          padding-top: 8rem;

          @media screen and (min-width: 1200px) {
            padding-left: var(--width-menu);
          }
        }
        `}
      </style>
    </Layout>
  );
}

Category.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      priceVnd: PropTypes.number.isRequired,
      priceUsd: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      category: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        singularName: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
      }),
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
          isThumbnail: PropTypes.bool.isRequired,
          isAltThumbnail: PropTypes.bool.isRequired,
          createdAt: PropTypes.string.isRequired,
        }),
      ),
    }),
  ).isRequired,
};

export async function getStaticPaths() {
  const categories = await getCategories();
  const paths = categories.map(({ slug }) => ({ params: { categorySlug: slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const category = await get(`http://localhost:3001/categories/${params.categorySlug}`);
  const products = await get(`http://localhost:3001/products?category_id=${category.id}`);

  return {
    props: {
      category,
      products,
      key: params.categorySlug,
    },
  };
}
