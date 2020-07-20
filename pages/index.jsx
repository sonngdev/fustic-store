import Vimeo from '@u-wave/react-vimeo';
import PropTypes from 'prop-types';
import Layout from 'components/layout';
import ProductGrid from 'components/product/product-grid';
import SiteProduct from 'components/product/site-product';
import { ensureCamel } from 'utils/object';

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
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      priceVnd: PropTypes.number.isRequired,
      priceUsd: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      category: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        singularName: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
      }),
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
          isThumbnail: PropTypes.bool.isRequired,
          isAltThumbnail: PropTypes.bool.isRequired,
          createdAt: PropTypes.string.isRequired,
        }),
      ),
    }),
  ).isRequired,
};

export async function getStaticProps() {
  const configReq = await fetch('http://localhost:3001/general_configs/active.json');
  const configRes = ensureCamel(await configReq.json());
  const vimeoId = configRes.generalConfig
    ? configRes.generalConfig.landingVimeoId
    : '340911673';

  const thumbnailReq = await fetch(`http://vimeo.com/api/v2/video/${vimeoId}.json`);
  const thumbnailRes = ensureCamel(await thumbnailReq.json());
  const vimeoThumbnailUrl = thumbnailRes[0].thumbnailLarge.replace('.webp', '.jpg');

  const productsReq = await fetch('http://localhost:3001/products.json');
  const productsRes = ensureCamel(await productsReq.json());
  const { products } = productsRes;

  return {
    props: {
      vimeoId,
      vimeoThumbnailUrl,
      products,
    },
  };
}
