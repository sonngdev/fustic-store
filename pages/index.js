import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [reveal, setReveal] = useState(null);

  return (
    <div>
      <Head>
        <title>Not At All Clothing</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="menu">

      </div>

      <div className="main-page">
        <header>
          <button className="menu-button" onClick={() => setReveal(!reveal ? 'menu' : null)}>
            <div className="hamburger-icon">
              <div />
              <div />
              <div />
            </div>
          </button>
          <img className="logo" src="/logo.svg" alt="Logo" />
          <div className="cart-button">Cart (0)</div>
        </header>

        <main>
        </main>

        <footer>
          Not At All Clothing
        </footer>
      </div>

      <style jsx>{`
        .menu {
          left: ${reveal === 'menu' ? '0' : '-300px'};
          height: 100%;
          width: 300px;
        }

        .main-page {
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          overflow-x: hidden;
          position: relative;
          left: ${reveal === 'menu' ? '300px' : '0'};
          transition: all 0.3s ease;
          height: 100%;

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
            grid-template-areas: "menu-button logo cart-button";

            .menu-button {
              grid-area: menu-button;
              justify-self: left;
              border: none;
              padding: 0;

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

            .logo {
              grid-area: logo;
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
        @import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');

        :root {
          --background-color: #0f0f0f;
          --text-color: #a7a7a7;
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
