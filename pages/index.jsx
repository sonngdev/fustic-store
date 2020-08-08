import Vimeo from '@u-wave/react-vimeo';
import PropTypes from 'prop-types';
import Layout from 'components/layout';
import ProductGrid from 'components/product/product-grid';
import SiteProduct from 'components/product/site-product';
import { getProducts, getGeneralConfig, getVimeoThumbnail } from 'utils/request';
import GeneralConfig, { DefaultGeneralConfig } from 'models/GeneralConfig';
import Product from 'models/Product';

export default function HomePage({ generalConfig, products, vimeoThumbnailUrl }) {
  return (
    <Layout>
      <div className="video">
        <Vimeo
          video={generalConfig.landingVimeoId}
          background
          loop
          className="background-video"
        />
      </div>

      <div className="home-page" id="home-page">
        <ProductGrid>
          {products.map((product) => <SiteProduct product={product} key={product.id} />)}
        </ProductGrid>
      </div>

      <style jsx>
        {`
        .video {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          position: relative;
          background-image: url(${generalConfig.landingPlaceholderImageUrl});
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

        .home-page {
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

HomePage.propTypes = {
  generalConfig: PropTypes.oneOfType([
    GeneralConfig,
    DefaultGeneralConfig,
  ]).isRequired,
  products: PropTypes.arrayOf(Product).isRequired,
  vimeoThumbnailUrl: PropTypes.string.isRequired,
};

export async function getStaticProps() {
  const defaultGeneralConfig = {
    landingVimeoId: '340911673',
  };
  const generalConfig = await getGeneralConfig() || defaultGeneralConfig;
  const products = await getProducts();
  const vimeoThumbnailUrl = await getVimeoThumbnail(generalConfig.landingVimeoId);

  return {
    props: {
      generalConfig,
      products,
      vimeoThumbnailUrl,
    },
  };
}
