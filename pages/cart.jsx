import { Fragment } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { selectCart } from 'store/selectors';
import Layout from 'components/layout';
import CartProductSmall from 'components/product/cart-product-small';

function CartPage() {
  const cart = useSelector(selectCart);

  return (
    <Layout>
      <Head>
        <title>Shopping Cart – Fustic Store</title>
      </Head>

      <div className="cart-page">
        <div className="cart-entries">
          {cart.map((entry, i) => (
            <Fragment key={`${entry.product.id}${entry.sizeName}`}>
              {i !== 0 && <hr />}
              <CartProductSmall cartEntry={entry} noneditable />
            </Fragment>
          ))}
        </div>
      </div>

      <style jsx>
        {`
        .cart-page {
          width: 100%;
          padding: 8rem var(--padding-page) 0;
          display: flex;
          flex-direction: column;
          align-items: center;

          .cart-entries hr {
            margin: 2rem 0;
          }
        }
        `}
      </style>
    </Layout>
  );
}

export default CartPage;
