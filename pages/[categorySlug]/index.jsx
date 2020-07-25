import PropTypes from 'prop-types';
import Head from 'next/head';
import Layout from 'components/layout';
import ProductGrid from 'components/product/product-grid';
import SiteProduct from 'components/product/site-product';
import { getCategories, getCategory, getProducts } from 'utils/request';
import Category from 'models/Category';
import Product from 'models/Product';

export default function CategoryPage({ category, products, categories }) {
  return (
    <Layout categories={categories}>
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

CategoryPage.propTypes = {
  category: Category.isRequired,
  products: PropTypes.arrayOf(Product).isRequired,
  categories: PropTypes.arrayOf(Category).isRequired,
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
  const category = await getCategory(params.categorySlug);
  const products = await getProducts(category.id);
  const categories = await getCategories();

  return {
    props: {
      category,
      products,
      categories,
      key: params.categorySlug,
    },
  };
}
