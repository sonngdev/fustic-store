/* eslint-disable no-nested-ternary */

import { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import Menu from './menu';
import Cart from './cart';
import MainPage from './main-page';

export default function Layout({ children }) {
  const [reveal, setReveal] = useState('');

  return (
    <div className="layout">
      <Head>
        <title>Not At All Clothing</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Menu />

      <MainPage
        showMenu={(e) => { e.stopPropagation(); setReveal(!reveal ? 'menu' : ''); }}
        showCart={(e) => { e.stopPropagation(); setReveal(!reveal ? 'cart' : ''); }}
        showMainpage={() => setReveal('')}
        reveal={reveal}
      >
        {children}
      </MainPage>

      <Cart />

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
            width: 280px;
            left: ${reveal === 'menu' ? '0' : '-280px'};
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

          .main-page {
            position: relative;
            overflow-x: hidden;
            min-height: 100vh;
            left: ${reveal === 'menu' ? '280px' : reveal === 'cart' ? '-280px' : '0'};
            transition: left 0.3s ease;
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
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};
