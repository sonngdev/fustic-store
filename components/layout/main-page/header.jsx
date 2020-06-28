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
        <img className="hamburger-icon" src="/icons/menu.svg" alt="Menu" />
      </button>
      <Link href="/">
        <a className="brand">
          <img src="/brand.png" alt="Fustic brand" />
        </a>
      </Link>
      <button type="button" className="cart-button" onClick={showCart}>
        Cart (1)
      </button>
      <div className="items">
        <a>Collections</a>
        <a>About</a>
        <button type="button" className="cart-icon-button" onClick={showCart}>
          <img src="/icons/cart.svg" alt="Cart" />
        </button>
      </div>

      <style jsx>
        {`
        header {
          position: fixed;
          top: 0;
          z-index: 1000;
          width: 100%;
          padding: var(--padding-header);

          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-areas: "menu-button brand cart-button";

          .items {
            display: none;
          }

          .menu-button, .cart-button {
            background-color: transparent;
            border: none;
            padding: 0 7px;
          }

          .menu-button {
            grid-area: menu-button;
            justify-self: left;

            .hamburger-icon {
              width: 20px;
              height: 20px;
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
            font-size: var(--fontsize-sm);
            text-transform: uppercase;
            opacity: ${reveal === 'cart' ? 0 : 1};
          }

          @media screen and (min-width: 1200px) {
            grid-template-columns: 1fr 1fr;
            grid-template-areas: "brand items";

            .menu-button, .cart-button {
              display: none;
            }

            .brand {
              justify-self: left;
            }

            .items {
              grid-area: items;
              justify-self: right;
              text-transform: uppercase;
              display: block;

              > * {
                margin-left: 20px;
              }

              .cart-icon-button img {
                vertical-align: top;
                width: 14px;
                height: 14px;
              }
            }
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
