/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */

import PropTypes from 'prop-types';
import Head from 'next/head';

import 'normalize.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import 'styles/global.scss';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Fustic Store</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};

App.defaultProps = {
  pageProps: {},
};
