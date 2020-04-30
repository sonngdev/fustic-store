/* eslint-disable react/jsx-props-no-spreading */
import 'normalize.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import 'styles/global.scss';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
