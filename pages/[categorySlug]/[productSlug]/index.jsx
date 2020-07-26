import Head from 'next/head';
import Layout from 'components/layout';
import ProductImages from 'components/product/product-images';
import ProductOrderer from 'components/product/product-orderer';
import { getProducts, getProduct } from 'utils/request';
import Product from 'models/Product';

export default function ProductPage({ product }) {
  return (
    <Layout>
      <Head>
        <title>{product.name} – {product.category.name} – Fustic Store</title>
      </Head>

      <div className="product-page">
        <ProductImages product={product} />
        <ProductOrderer product={product} />
      </div>

      <style jsx>
        {`
        .product-page {
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

  return {
    props: {
      product,
    },
  };
}
