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
            grid-template-columns: 4fr 6fr;
            column-gap: 4em;

            max-width: 600px;

            .first {
              max-height: 350px;
              overflow: auto;
              justify-self: right;
              align-self: start;
            }

            .second {
              align-self: stretch;
              margin-top: 0;
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
