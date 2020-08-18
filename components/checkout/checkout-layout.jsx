import PropTypes from 'prop-types';

function CheckoutLayout({ children }) {
  return (
    <section className="checkout-layout">
      <article className="first scrollbar-visible">
        {children[0]}
      </article>

      <article className="second">
        {children[1]}
      </article>

      <style jsx>
        {`
        .checkout-layout {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 auto;

          .second {
            width: 100%;
            margin-top: 3rem;
          }

          @media screen and (min-width: 768px) {
            display: grid;
            grid-template-columns: auto 330px;
            column-gap: 4em;
            width: fit-content;

            .first {
              max-height: 350px;
              max-width: 350px;
              overflow: auto;
              justify-self: right;
              align-self: start;
            }

            .second {
              align-self: start;
              margin-top: 0;
            }
          }

          @media screen and (min-width: 1200px) {
            grid-template-columns: 350px 330px;
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
