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
          <button className="cart-button" onClick={(e) => { e.stopPropagation(); setReveal(!reveal ? 'cart' : null); }}>
            Cart (1)
          </button>
        </header>

        <main>
        </main>

        <footer>
          Not At All Clothing
        </footer>
      </div>

      <div className="cart">
        <table>
          <thead>
            <tr>
              <th>Cart (1)</th>
              <th>420,000 vnd</th>
              <th>$20.00</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ACID TEE</td>
              <td>420,000</td>
              <td>20.00</td>
            </tr>
          </tbody>
        </table>
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
          position: fixed;
          top: 0;
          height: 100%;
          width: 280px;
          left: ${reveal === 'menu' ? '0' : '-280px'};
          transition: all 0.3s ease;
        }

        .main-page {
          position: relative;
          overflow-x: hidden;
          min-height: 100vh;
          left: ${reveal === 'menu' ? '280px' : reveal === 'cart' ? '-280px' : '0'};
          transition: all 0.3s ease;
        }

        .cart {
          position: fixed;
          top: 0;
          height: 100%;
          width: 280px;
          right: ${reveal === 'cart' ? '0' : '-280px'};
          transition: all 0.3s ease;
        }

        .menu {
          padding: 80px 30px 30px;

          .item, .subitem {
            display: block;
            text-decoration: none;

            @include hover;
          }

          .item {
            font-weight: bold;
            margin-bottom: 0.8rem;
          }

          .subitem {
            text-transform: uppercase;
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

        .cart {
          font-size: 13.33px;
          padding: 15px;

          table th, table td {
            text-align: left;
            height: 25px;

            &:first-child {
              width: 100px;
            }

            &:nth-child(2) {
              width: 90px;
            }

            &:last-child {
              text-align: right;
              width: 50px;
            }
          }
        }

        .main-page {
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

            button {
              border: none;
              padding: 0;
              cursor: pointer;
            }

            .menu-button {
              grid-area: menu-button;
              justify-self: left;

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
              visibility: ${reveal === 'cart' ? 'hidden' : 'visible'};
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
