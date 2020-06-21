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
            margin-bottom: var(--spacing-lg);
          }

          @media screen and (min-width: 576px) {
            flex-direction: row;
            justify-content: center;

            > * {
              margin-left: calc(2 * var(--spacing-sm));
              margin-right: calc(2 * var(--spacing-sm));
            }
          }

          @media screen and (min-width: 1200px) {
            justify-content: flex-start;

            > * {
              margin-left: 0;
              margin-right: var(--spacing-xxl);
            }
          }

          @media screen and (min-width: 1600px) {
            > * {
              margin-right: calc(1.5 * var(--spacing-xxl));
              margin-bottom: calc(1.5 * var(--spacing-xxl));
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
