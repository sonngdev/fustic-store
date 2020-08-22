import PropTypes from 'prop-types';
import cx from 'classnames';
import { useRouter } from 'next/router';

function CheckoutLayout({ children }) {
  const { pathname } = useRouter();

  return (
    <section className="checkout-layout">
      <nav>
        <small className={cx({ active: pathname === '/checkout/summary' })}>Summary</small>
        <span role="separator">•</span>
        <small className={cx({ active: pathname === '/checkout/shipping' })}>Shipping</small>
        <span role="separator">•</span>
        <small className={cx({ active: pathname === '/checkout/payment' })}>Payment</small>
      </nav>

      <article className="first scrollbar-visible">
        {children[0]}
      </article>

      <article className="second">
        {children[1]}
      </article>

      <style jsx>
        {`
        .checkout-layout {
          display: flex;
          flex-direction: column;
          align-items: center;

          width: 100%;
          max-width: 450px;
          margin: 0 auto;

          padding-left: 30px;
          padding-right: 30px;

          nav {
            text-transform: uppercase;
            margin-bottom: 2em;

            > *:not(.active) {
              opacity: 0.4;
            }

            [role=separator] {
              margin-left: 8px;
              margin-right: 8px;
            }
          }

          .second {
            width: 100%;
            margin-top: 3rem;
          }

          @media screen and (min-width: 375px) {
            padding-left: 50px;
            padding-right: 50px;
          }

          @media screen and (min-width: 768px) {
            display: grid;
            grid-template-columns: auto 330px;
            grid-template-areas:
              "nav nav"
              "first second";
            column-gap: 4em;
            row-gap: 2em;

            width: fit-content;
            max-width: none;

            nav {
              grid-area: nav;
              margin: 0 auto;
            }

            .first {
              grid-area: first;
              padding-top: 0.75em;
              max-height: 450px;
              height: 100%;
              width: 100%;
              overflow: auto;
              justify-self: right;
              align-self: start;
            }

            .second {
              grid-area: second;
              align-self: start;
              margin-top: 0;
            }
          }

          @media screen and (min-width: 1200px) {
            grid-template-columns: 350px 330px;
            row-gap: 3em;
          }

          @media screen and (min-width: 1800px) {
            grid-template-columns: 600px 600px;

            .first {
              max-height: 600px;
            }
          }
        }
        `}
      </style>
    </section>
  );
}

CheckoutLayout.propTypes = {
  children: PropTypes.node,
};

CheckoutLayout.defaultProps = {
  children: null,
};

export default CheckoutLayout;
