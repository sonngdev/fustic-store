/* eslint-disable jsx-a11y/no-static-element-interactions */

import PropTypes from 'prop-types';
import Header from './header';

export default function MainPage({
  showMenu,
  showCart,
  showMainpage,
  reveal,
  offsetTop,
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

      <footer>
        Fustic Store
      </footer>

      <style jsx>
        {`
        .main-page {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-top: ${offsetTop ? 'calc(var(--height-brand) + 2 * var(--padding-header))' : '0.1px'};

          position: relative;

          .overlay {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            display: ${reveal ? 'block' : 'none'};
            opacity: 0;
            z-index: 100;
          }

          main {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            margin-bottom: var(--spacing-xxl);
          }

          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
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
  offsetTop: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

MainPage.defaultProps = {
  children: null,
};
