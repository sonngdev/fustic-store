import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Not At All Clothing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div className="hamburger-icon">
          <div />
          <div />
          <div />
        </div>
        <img className="logo" src="/logo.svg" alt="logo" />
        <div className="cart">Cart (0)</div>
      </header>

      <main>
      </main>

      <footer>
        Not At All Clothing
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

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
          display: flex;
          justify-content: center;
          align-items: center;
        }

        header {
          position: fixed;
          top: 0;
          width: 100vw;
          padding: 15px;

          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-areas: "menu logo cart";

          .hamburger-icon {
            grid-area: menu;
            justify-self: left;
            width: 20px;
            height: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            div {
              height: 10px;
              background-color: var(--text-color);
              margin: 2.2px 0;
            }
          }

          .logo {
            grid-area: logo;
            justify-self: center;
          }

          .cart {
            grid-area: cart;
            justify-self: right;
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
