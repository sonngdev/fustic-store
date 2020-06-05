/* eslint-disable jsx-a11y/no-static-element-interactions */

import PropTypes from 'prop-types';
import Link from 'next/link';

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

      <header>
        <button type="button" className="menu-button" onClick={showMenu}>
          <div className="hamburger-icon">
            <div />
            <div />
            <div />
          </div>
        </button>
        <Link href="/">
          <a className="brand">
            <img src="/brand.svg" alt="Brand" />
          </a>
        </Link>
        <button type="button" className="cart-button" onClick={showCart}>
          Cart (1)
        </button>
      </header>

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
            margin-bottom: var(--spacing-xl);
          }

          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
          }

          header {
            position: fixed;
            top: 0;
            z-index: 1000;
            width: 100%;
            padding: var(--padding-header);
            background-color: var(--color-background);

            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-areas: "menu-button brand cart-button";

            .menu-button, .cart-button {
              background-color: transparent;
              border: none;
              padding: 0 7px;

              @media screen and (min-width: 1200px) {
                display: none;
              }
            }

            .menu-button {
              grid-area: menu-button;
              justify-self: left;

              .hamburger-icon {
                width: 20px;
                height: 20px;

                div {
                  height: 2px;
                  background-color: var(--color-text);
                  margin: 4px 0;
                }
              }
            }

            .brand {
              grid-area: brand;
              justify-self: center;
              display: flex;
              align-items: center;

              img {
                height: var(--height-brand);
              }
            }

            .cart-button {
              grid-area: cart-button;
              justify-self: right;
              opacity: ${reveal === 'cart' ? 0 : 1};
              font-size: var(--fontsize-small);
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
