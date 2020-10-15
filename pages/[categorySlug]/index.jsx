import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from 'components/layout';
import ProductGrid from 'components/product/product-grid';
import SiteProduct from 'components/product/site-product';
import { getCategories, getCategory, getProducts } from 'utils/request';
import Category from 'models/Category';
import Product from 'models/Product';

export default function CategoryPage({ category, products }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div>Loading...</div>
    );
  }

  const ogImage = products[0]?.images.find((image) => image.isThumbnail)?.url
    || `${process.env.NEXT_PUBLIC_BASE_URL}/fustic-white.png`;

  return (
    <Layout>
      <Head>
        <title>{category.name} – Fustic. Store</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/${category.slug}`} />
        <meta name="description" content={`${category.name} on Fustic. Store`} />
        <meta name="keywords" content={`fustic store,fustic studio,${category.name}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Fustic. Store" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}/${category.slug}`} />
        <meta property="og:title" content={`${category.name} – Fustic. Store`} />
        <meta property="og:description" content={`${category.name} on Fustic. Store`} />
        <meta property="og:image" content={ogImage} />
      </Head>

      <div className="category-page">
        <ProductGrid>
          {products.map((product) => <SiteProduct product={product} key={product.slug} />)}
        </ProductGrid>
      </div>

      <style jsx>
        {`
        .category-page {
          padding: 8rem var(--padding-page) 4rem;

          @media screen and (min-width: 1200px) {
            padding: 12rem var(--padding-page) 8rem var(--width-menu);
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
};

export async function getStaticPaths() {
  const categories = await getCategories();
  const paths = categories.map(({ slug }) => ({ params: { categorySlug: slug } }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const category = await getCategory(params.categorySlug);
  const products = await getProducts(category.id);

  return {
    props: {
      category,
      products,
      key: params.categorySlug,
    },
    revalidate: true,
  };
}
