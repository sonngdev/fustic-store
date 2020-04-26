import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [reveal, setReveal] = useState(null);

  return (
    <div className="container">
      <Head>
        <title>Not At All Clothing</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="menu">
        <Link href="/"><a className="item">Products</a></Link>
        <ul>
          <li><Link href="/t-shirts"><a className="subitem">T-Shirts</a></Link></li>
          <li><Link href="/sweaters"><a className="subitem">Sweaters</a></Link></li>
          <li><Link href="/hoodies"><a className="subitem">Hoodies</a></Link></li>
          <li><Link href="/prints"><a className="subitem">Prints</a></Link></li>
        </ul>

        <Link href="/contact"><a className="item">Contact</a></Link>
        <a href="https://www.instagram.com/notatallclothing" className="item">Instagram</a>
        <a href="https://www.facebook.com/notatall.clothing" className="item">Facebook</a>

        <img src="/logo.svg" alt="Logo" className="logo" />
      </div>

      <div className="main-page" onClick={() => setReveal(null)}>
        <header>
          <button className="menu-button" onClick={(e) => { e.stopPropagation(); setReveal(!reveal ? 'menu' : null); }}>
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
          <div className="cart-button">Cart (0)</div>
        </header>

        <main>
        </main>

        <footer>
          Not At All Clothing
        </footer>
      </div>

      <style jsx>{`
        @mixin hover {
          &:not([disabled]):hover {
            color: var(--accent-color);
          }
        }

        .container {
          overflow: hidden;
        }

        .menu {
          left: ${reveal === 'menu' ? '0' : '-280px'};
          height: 100%;
          width: 280px;
          top: 0;
          position: fixed;
          transition: all 0.3s ease;

          padding: 80px 30px 30px;

          .item, .subitem {
            display: block;
            text-decoration: none;
          }

          .item {
            font-weight: bold;
            margin-bottom: 0.8rem;
            @include hover;
          }

          .subitem {
            text-transform: uppercase;
            @include hover;
          }

          ul {
            list-style: none;
            margin: 0;
            padding: 0;
            margin-bottom: 3rem;

            li {
              margin-bottom: 0.5rem;
            }
          }

          .logo {
            width: 4rem;
            margin-top: 1rem;
          }
        }

        .main-page {
          overflow-x: hidden;
          position: relative;
          left: ${reveal === 'menu' ? '280px' : '0'};
          transition: all 0.3s ease;
          min-height: 100vh;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
          }

          header {
            position: sticky;
            top: 0;
            width: 100vw;
            padding: 15px;

            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-areas: "menu-button brand cart-button";

            .menu-button {
              grid-area: menu-button;
              justify-self: left;
              border: none;
              padding: 0;
              cursor: pointer;

              .hamburger-icon {
                width: 20px;
                height: 20px;

                div {
                  height: 2px;
                  background-color: var(--text-color);
                  margin: 4px 0;
                }
              }
            }

            .brand {
              grid-area: brand;
              justify-self: center;
            }

            .cart-button {
              grid-area: cart-button;
              justify-self: right;
            }
          }
        }
      `}</style>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap');

        :root {
          --background-color: #0f0f0f;
          --text-color: #a7a7a7;
          --accent-color: #00ff08;
        }

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'Raleway', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
          background-color: var(--background-color);
          color: var(--text-color);
        }
      `}</style>
    </div>
  )
}
