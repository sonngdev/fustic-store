import PropTypes from 'prop-types';
import Link from 'next/link';
import { getCartQuantity } from 'utils/checkout';
import { useCart } from 'hooks/store';

export default function Header({
  showMenu,
  showCart,
  reveal,
}) {
  const cart = useCart();
  const cartQuantity = getCartQuantity(cart);

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
        Cart
        {!!cartQuantity && <span className="quantity">{cartQuantity}</span>}
      </button>
      <div className="items">
        <Link href="/">
          <a>Collections</a>
        </Link>
        <a>About</a>
        <button type="button" className="cart-icon-button" onClick={showCart}>
          <img src="/icons/cart.svg" alt="Cart" />
          {!!cartQuantity && <span className="quantity">{cartQuantity}</span>}
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
          align-items: center;

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

            .quantity {
              display: inline-block;
              background-color: #CC0000;
              border-radius: 50%;
              padding: 0.2em;
              width: 1.5em;
              height: 1.5em;
              text-align: center;
              margin-left: 0.25em;
            }
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

              display: grid;
              grid-template-columns: min-content min-content min-content;
              column-gap: 30px;

              text-transform: uppercase;

              > a {
                display: flex;
                align-items: center;
              }

              .cart-icon-button {
                width: max-content;

                img {
                  vertical-align: text-top;
                  width: calc(var(--fontsize-md) * 1.23);
                  height: calc(var(--fontsize-md) * 1.23);
                }

                .quantity {
                  display: inline-block;
                  background-color: #CC0000;
                  border-radius: 50%;
                  padding: 0.2em;
                  width: 1.5em;
                  height: 1.5em;
                  text-align: center;
                  margin-left: 0.5em;
                }
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
