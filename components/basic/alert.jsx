/* eslint-disable react/no-danger */

import PropTypes from 'prop-types';

function Alert({ message }) {
  return (
    <div className="alert">
      <div dangerouslySetInnerHTML={{ __html: message }} />

      <style jsx>
        {`
        .alert {
          background-color: #F1B5A9;
          color: #721c24;
          padding: 1.2em 2em;

          @media screen and (min-width: 1200px) {
            font-size: var(--fontsize-md);
            font-weight: var(--fontweight-bold);
            padding: 2em;
          }
        }
        `}
      </style>
    </div>
  );
}

Alert.propTypes = {
  message: PropTypes.node.isRequired,
};

export default Alert;
