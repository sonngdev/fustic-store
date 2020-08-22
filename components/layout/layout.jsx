/* eslint-disable no-nested-ternary */

import { useState } from 'react';
import PropTypes from 'prop-types';

import Menu from './menu';
import Cart from './cart';
import MainPage from './main-page';

export default function Layout({ children }) {
  const [reveal, setReveal] = useState('');

  return (
    <div className="layout">
      <Menu visible={reveal === 'menu'} hideMenu={() => setReveal('')} />

      <MainPage
        showMenu={(e) => { e.stopPropagation(); setReveal('menu'); }}
        showCart={(e) => { e.stopPropagation(); setReveal('cart'); }}
        showMainpage={(e) => { e.stopPropagation(); setReveal(''); }}
        reveal={reveal}
      >
        {children}
      </MainPage>

      <Cart visible={reveal === 'cart'} />

      <style jsx>
        {`
        .layout {
          overflow: hidden;
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
            width: var(--width-menu);
            left: ${reveal === 'menu' ? '0' : 'calc(-1 * var(--width-menu))'};
            transition: left 0.3s ease;
          }

          .main-page {
            position: relative;
            overflow-x: hidden;
            min-height: 100vh;
            left: ${reveal === 'menu' ? 'var(--width-menu)' : reveal === 'cart' ? 'calc(-1 * var(--width-cart))' : '0'};
            transition: left 0.3s ease;
          }

          .cart {
            position: fixed;
            top: 0;
            height: 100%;
            width: var(--width-cart);
            right: ${reveal === 'cart' ? '0' : 'calc(-1 * var(--width-cart))'};
            transition: right 0.3s ease;
          }
        }

        @media screen and (min-width: 1200px) {
          .menu {
            position: fixed;
            top: 0;
            z-index: 100;
            height: 100vh;
            width: var(--width-menu);
          }

          .cart {
            position: fixed;
            top: 0;
            height: 100vh;
            width: var(--width-cart);
            right: ${reveal === 'cart' ? '0' : 'calc(-1 * var(--width-cart))'};
            transition: right 0.3s ease;
            z-index: 3000;
          }
        }
        `}
      </style>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};
