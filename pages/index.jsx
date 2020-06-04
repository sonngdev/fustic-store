import Layout from 'components/layout';
import ProductGrid from 'components/product-grid';
import SiteProduct from 'components/site-product';

export default function Home({ products }) {
  return (
    <Layout>
      <div className="home">
        <ProductGrid>
          {products.map((product) => <SiteProduct product={product} key={product.slug} />)}
        </ProductGrid>
      </div>

      <style jsx>
        {`
        .home {
          margin-top: var(--spacing-xl);
          width: 100%;
        }
        `}
      </style>
    </Layout>
  );
}

export async function getStaticProps() {
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

  return {
    props: {
      products,
    },
  };
}
