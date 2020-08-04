/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useStore, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import smoothscroll from 'smoothscroll-polyfill';

import { wrapper } from 'store';
import { updateCartProducts } from 'store/actions';
import { getProducts } from 'utils/request';

import 'smoothscroll-anchor-polyfill';
import 'normalize.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import 'styles/global.scss';

function useUpdatedCartProducts() {
  const dispatch = useDispatch();

  useEffect(() => {
    const request = async () => {
      const products = await getProducts();
      dispatch(updateCartProducts(products));
    };
    request();
  }, []);
}

function App({ Component, pageProps }) {
  const store = useStore();
  useUpdatedCartProducts();

  /**
   * This only polyfills javascript. To polyfill anchors scrolling
   * behavior, we need smoothscroll-anchor-polyfill in addition.
   * https://github.com/jonaskuske/smoothscroll-anchor-polyfill
   */
  useEffect(() => { smoothscroll.polyfill(); });

  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <Head>
        <title>Fustic Store</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Component {...pageProps} />
    </PersistGate>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};

App.defaultProps = {
  pageProps: {},
};

export default wrapper.withRedux(App);
