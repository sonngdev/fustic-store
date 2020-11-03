/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import smoothscroll from 'smoothscroll-polyfill';

import { wrapper } from 'store';
import { cacheCategories } from 'store/actions';
import { getCategories } from 'utils/request';
import useThemeAdaptiveValue from 'hooks/useThemeAdaptiveValue';

import 'smoothscroll-anchor-polyfill';
import 'normalize.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import 'styles/global.scss';

/**
|--------------------------------------------------
| CUSTOM HOOKS
|--------------------------------------------------
*/
function useCategoriesPrefetch() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      dispatch(cacheCategories(categories));
    };
    fetchCategories();
  }, []);
}

function useSmoothScrollPolyfill() {
  /**
   * This only polyfills javascript. To polyfill anchors scrolling
   * behavior, we need smoothscroll-anchor-polyfill in addition.
   * https://github.com/jonaskuske/smoothscroll-anchor-polyfill
   */
  useEffect(() => { smoothscroll.polyfill(); });
}

/**
|--------------------------------------------------
| COMPONENT
|--------------------------------------------------
*/
function App({ Component, pageProps }) {
  useCategoriesPrefetch();
  useSmoothScrollPolyfill();

  const adaptiveFaviconDir = useThemeAdaptiveValue('/favicon-black', '/favicon-white');
  const adaptiveBackgroundColor = useThemeAdaptiveValue('#ffffff', '#0f0f0f');

  return (
    <>
      <Head>
        <title>Fustic. Store</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Generated with https://realfavicongenerator.net/ */}
        <link rel="apple-touch-icon" sizes="180x180" href={`${adaptiveFaviconDir}/apple-touch-icon.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${adaptiveFaviconDir}/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${adaptiveFaviconDir}/favicon-16x16.png`} />
        <link rel="manifest" href={`${adaptiveFaviconDir}/site.webmanifest`} />
        <link rel="mask-icon" href={`${adaptiveFaviconDir}/safari-pinned-tab.svg" color="#0f0f0f`} />
        <link rel="shortcut icon" href={`${adaptiveFaviconDir}/favicon.ico`} />
        <meta name="msapplication-TileColor" content={adaptiveBackgroundColor} />
        <meta name="msapplication-config" content={`${adaptiveFaviconDir}/browserconfig.xml`} />
        <meta name="theme-color" content={adaptiveBackgroundColor} />
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

export default wrapper.withRedux(App);
