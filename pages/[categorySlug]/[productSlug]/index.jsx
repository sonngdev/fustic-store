import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from 'components/layout';
import ProductImages from 'components/product/product-images';
import ProductOrderer from 'components/product/product-orderer';
import { getProducts, getProduct } from 'utils/request';
import Product from 'models/Product';

export default function ProductPage({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div>Loading...</div>
    );
  }

  const ogImage = product.images.find((image) => image.isThumbnail)?.url
    || `${process.env.NEXT_PUBLIC_BASE_URL}/fustic-white.png`;

  return (
    <Layout>
      <Head>
        <title>{product.name} – {product.category.name} – Fustic. Store</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/${product.category.slug}/${product.slug}`} />
        <meta name="description" content={`${product.name} ${product.category.singularName} on Fustic. Store`} />
        <meta name="keywords" content={`fustic store,fustic studio,${product.category.name},${product.name}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Fustic. Store" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}/${product.category.slug}/${product.slug}`} />
        <meta property="og:title" content={`${product.name} – ${product.category.name} – Fustic. Store`} />
        <meta property="og:description" content={`${product.name} ${product.category.singularName} on Fustic. Store`} />
        <meta property="og:image" content={ogImage} />
      </Head>

      <div className="product-page">
        <ProductImages product={product} />
        <ProductOrderer product={product} />
      </div>

      <style jsx>
        {`
        .product-page {
          display: flex;
          flex-direction: column;
          align-items: center;

          text-transform: uppercase;
          padding: 8rem var(--padding-page) 4rem;

          @media screen and (min-width: 992px) {
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }

          @media screen and (min-width: 1200px) {
            padding: 10rem var(--padding-page) 3rem var(--width-menu);
            justify-content: flex-start;
            align-items: center;
          }

          @media screen and (min-width: 1800px) {
            padding: 16rem var(--padding-page) 3rem var(--width-menu);
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
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const product = await getProduct(params.productSlug);

  return {
    props: {
      product,
    },
    revalidate: true,
  };
}
