/* eslint-disable no-nested-ternary */

import { useState } from 'react';
import PropTypes from 'prop-types';

import Menu from './menu';
import Cart from './cart';
import MainPage from './main-page';

export default function Layout({ offsetTop, children }) {
  const [reveal, setReveal] = useState('');

  return (
    <div className="layout">
      <Menu visible={reveal === 'menu'} />

      <MainPage
        showMenu={(e) => { e.stopPropagation(); setReveal(!reveal ? 'menu' : ''); }}
        showCart={(e) => { e.stopPropagation(); setReveal(!reveal ? 'cart' : ''); }}
        showMainpage={() => setReveal('')}
        reveal={reveal}
        offsetTop={offsetTop}
      >
        {children}
      </MainPage>

      <Cart visible={reveal === 'cart'} />

      <style jsx>
        {`
        .layout {
          overflow: hidden;
          max-width: 1920px;
          margin: 0 auto;
        }
        `}
      </style>

      <style jsx global>
        {`
        @media screen and (max-width: 1200px) {
          .menu {
            position: fixed;
            top: 0;
            height: 100%;
            width: 230px;
            left: ${reveal === 'menu' ? '0' : '-230px'};
            transition: left 0.3s ease;
          }

          .main-page {
            position: relative;
            overflow-x: hidden;
            min-height: 100vh;
            left: ${reveal === 'menu' ? '230px' : reveal === 'cart' ? '-280px' : '0'};
            transition: left 0.3s ease;
          }

          .cart {
            position: fixed;
            top: 0;
            height: 100%;
            width: 280px;
            right: ${reveal === 'cart' ? '0' : '-280px'};
            transition: right 0.3s ease;
          }
        }

        @media screen and (min-width: 1200px) {
          .layout {
            display: grid;
            grid-template-columns: auto 1fr auto;
            grid-template-areas: "menu-button brand cart-button";
          }

          .menu, .cart {
            &-container {
              position: fixed;
            }
          }
        }
        `}
      </style>
    </div>
  );
}

Layout.propTypes = {
  offsetTop: PropTypes.bool,
  children: PropTypes.node,
};

Layout.defaultProps = {
  offsetTop: true,
  children: null,
};
