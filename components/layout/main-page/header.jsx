import PropTypes from 'prop-types';
import Link from 'next/link';

export default function Header({
  showMenu,
  showCart,
  reveal,
}) {
  return (
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
          <img src="/brand.png" alt="Fustic brand" />
        </a>
      </Link>
      <button type="button" className="cart-button" onClick={showCart}>
        Cart (1)
      </button>

      <style jsx>
        {`
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
        `}
      </style>
    </header>
  );
}

Header.propTypes = {
  showMenu: PropTypes.func.isRequired,
  showCart: PropTypes.func.isRequired,
  reveal: PropTypes.string.isRequired,
};
