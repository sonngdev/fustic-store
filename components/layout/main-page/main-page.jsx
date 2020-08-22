/* eslint-disable jsx-a11y/no-static-element-interactions */

import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';

export default function MainPage({
  showMenu,
  showCart,
  showMainpage,
  reveal,
  children,
}) {
  return (
    <div className="main-page">
      <div className="overlay" onClick={showMainpage} onKeyPress={showMainpage} />

      <Header
        showMenu={showMenu}
        showCart={showCart}
        reveal={reveal}
      />

      <main>
        {children}
      </main>

      <Footer />

      <style jsx>
        {`
        .main-page {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-top: 0.1px; /* Fix Safari UI glitch with fixed elements */
          padding-bottom: 3rem;

          position: relative;

          .overlay {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            display: ${reveal ? 'block' : 'none'};
            opacity: 0;
            z-index: 2000;
          }

          main {
            flex: 1;
            width: 100%;

            :global(> *) {
              margin: 0 auto;
            }
          }

          @media screen and (min-width: 1200px) {
            .overlay {
              background-color: var(--color-background);
              opacity: 0.6;
            }
          }
        }
        `}
      </style>
    </div>
  );
}

MainPage.propTypes = {
  showMenu: PropTypes.func.isRequired,
  showCart: PropTypes.func.isRequired,
  showMainpage: PropTypes.func.isRequired,
  reveal: PropTypes.string.isRequired,
  children: PropTypes.node,
};

MainPage.defaultProps = {
  children: null,
};
