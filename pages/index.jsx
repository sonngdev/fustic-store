import Vimeo from '@u-wave/react-vimeo';
import PropTypes from 'prop-types';
import Layout from 'components/layout';
import ProductGrid from 'components/product/product-grid';
import SiteProduct from 'components/product/site-product';

export default function Home({
  products,
  vimeoId,
  vimeoThumbnailUrl,
}) {
  return (
    <Layout>
      <div className="video">
        <Vimeo
          video={vimeoId}
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
          {products.map((product) => <SiteProduct product={product} key={`${product.slug}3`} />)}
          {products.map((product) => <SiteProduct product={product} key={`${product.slug}4`} />)}
          {products.map((product) => <SiteProduct product={product} key={`${product.slug}5`} />)}
          {products.map((product) => <SiteProduct product={product} key={`${product.slug}6`} />)}
        </ProductGrid>
      </div>

      <style jsx>
        {`
        .video {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          position: relative;
          background-image: url('${vimeoThumbnailUrl}');
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
          padding-top: 8rem;
          width: 100%;

          @media screen and (min-width: 1200px) {
            padding-left: var(--width-menu);
          }
        }
        `}
      </style>
    </Layout>
  );
}

Home.propTypes = {
  vimeoId: PropTypes.string.isRequired,
  vimeoThumbnailUrl: PropTypes.string.isRequired,
};

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

  const configReq = await fetch('http://localhost:3001/general_configs/active');
  const configRes = await configReq.json();
  const vimeoId = configRes.general_config
    ? configRes.general_config.landing_vimeo_id
    : '340911673';

  const thumbnailReq = await fetch(`http://vimeo.com/api/v2/video/${vimeoId}.json`);
  const thumbnailRes = await thumbnailReq.json();
  const vimeoThumbnailUrl = thumbnailRes[0].thumbnail_large.replace('.webp', '.jpg');

  return {
    props: {
      products,
      vimeoId,
      vimeoThumbnailUrl,
    },
  };
}
