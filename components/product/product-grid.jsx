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
            margin-bottom: var(--spacing-xl);
          }

          @media screen and (min-width: 576px) {
            flex-direction: row;
            justify-content: center;

            > * {
              margin-left: calc(2 * var(--spacing-md));
              margin-right: calc(2 * var(--spacing-md));
            }
          }

          @media screen and (min-width: 1200px) {
            justify-content: flex-start;

            > * {
              margin-left: 0;
              margin-right: var(--spacing-xxl);
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
