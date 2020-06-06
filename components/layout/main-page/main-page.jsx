/* eslint-disable jsx-a11y/no-static-element-interactions */

import PropTypes from 'prop-types';
import Header from './header';

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

      <footer>
        Not At All Clothing
      </footer>

      <style jsx>
        {`
        .main-page {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-top: calc(var(--height-brand) + 2 * var(--padding-header));

          position: relative;

          .overlay {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            display: ${reveal ? 'block' : 'none'};
            opacity: 0;
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
  children: PropTypes.node,
};

MainPage.defaultProps = {
  children: null,
};