import PropTypes from 'prop-types';

export default function ProductGrid({ children }) {
  return (
    <div className="grid">
      {children}

      <style jsx global>
        {`
        .grid {
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          align-items: center;

          > * {
            margin: 0;
            margin-bottom: 4rem;
          }

          @media screen and (min-width: 576px) {
            flex-direction: row;
            justify-content: center;

            > * {
              margin-left: 1.6rem;
              margin-right: 1.6rem;
            }
          }

          @media screen and (min-width: 1200px) {
            justify-content: flex-start;

            > * {
              margin-left: 0;
              margin-right: 4rem;
            }
          }

          @media screen and (min-width: 1800px) {
            > * {
              margin-right: calc(1.5 * 4rem);
              margin-bottom: calc(1.5 * 4rem);
            }
          }
        }
        `}
      </style>
    </div>
  );
}

ProductGrid.propTypes = {
  children: PropTypes.node,
};

ProductGrid.defaultProps = {
  children: null,
};
