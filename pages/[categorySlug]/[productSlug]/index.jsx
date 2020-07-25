import PropTypes from 'prop-types';
import Head from 'next/head';
import Layout from 'components/layout';
import ProductImages from 'components/product/product-images';
import ProductOrderer from 'components/product/product-orderer';
import { getCategories, getProducts, getProduct } from 'utils/request';
import Category from 'models/Category';
import Product from 'models/Product';

export default function ProductPage({ product, categories }) {
  return (
    <Layout categories={categories}>
      <Head>
        <title>{product.name} – {product.category.name} – Fustic Store</title>
      </Head>

      <div className="product">
        <ProductImages product={product} />
        <ProductOrderer product={product} />
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

          @media screen and (min-width: 992px) {
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }

          @media screen and (min-width: 1200px) {
            padding-left: var(--width-menu);
            justify-content: flex-start;
          }
        }
        `}
      </style>
    </Layout>
  );
}

ProductPage.propTypes = {
  product: Product.isRequired,
  categories: PropTypes.arrayOf(Category).isRequired,
};

export async function getStaticPaths() {
  const products = await getProducts();

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

export async function getStaticProps({ params }) {
  const product = await getProduct(params.productSlug);
  const categories = await getCategories();

  return {
    props: {
      product,
      categories,
    },
  };
}
