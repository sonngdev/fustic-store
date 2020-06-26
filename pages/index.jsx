import Layout from 'components/layout';
import ProductGrid from 'components/product/product-grid';
import SiteProduct from 'components/product/site-product';

export default function Home({ products }) {
  return (
    <Layout>
      <div className="home">
        <ProductGrid>
          {products.map((product) => <SiteProduct product={product} key={product.slug} />)}
          {products.map((product) => <SiteProduct product={product} key={`${product.slug}1`} />)}
          {products.map((product) => <SiteProduct product={product} key={`${product.slug}2`} />)}
        </ProductGrid>
      </div>

      <style jsx>
        {`
        .home {
          margin-top: var(--spacing-xxl);
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
      category: {
        id: 1,
        slug: 't-shirts',
        name: 'T-Shirts',
        singularName: 'T-Shirt',
      },
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
      category: {
        id: 1,
        slug: 't-shirts',
        name: 'T-Shirts',
        singularName: 'T-Shirt',
      },
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
      products,
    },
  };
}
