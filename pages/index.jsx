import Vimeo from '@u-wave/react-vimeo';
import Layout from 'components/layout';
import ProductGrid from 'components/product/product-grid';
import SiteProduct from 'components/product/site-product';

export default function Home({ products }) {
  return (
    <Layout offsetTop={false}>
      <div className="video">
        <Vimeo
          video="247516963"
          background
          loop
          className="background-video"
        />
      </div>

      <div className="home">
        <ProductGrid>
          {products.map((product) => <SiteProduct product={product} key={product.slug} />)}
          {products.map((product) => <SiteProduct product={product} key={`${product.slug}1`} />)}
          {products.map((product) => <SiteProduct product={product} key={`${product.slug}2`} />)}
        </ProductGrid>
      </div>

      <style jsx>
        {`
        .video {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          position: relative;
          background-image: url('https://i.vimeocdn.com/video/672805114_640.jpg');
          background-size: cover;
          background-position: center;

          /**
           * Fullscreen video background
           * https://codepen.io/abennington/pen/ZONqqv?editors=0100
           */
          :global(.background-video iframe) {
            width: 100vw;
            height: 56.25vw; /* Given a 16:9 aspect ratio, 9/16*100 = 56.25 */
            min-width: 177.77vh; /* Given a 16:9 aspect ratio, 16/9*100 = 177.77 */
            min-height: 100vh;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }

        .home {
          margin-top: var(--spacing-xxxl);
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
