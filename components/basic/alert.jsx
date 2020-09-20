/* eslint-disable react/no-danger */

import PropTypes from 'prop-types';

function Alert({ message }) {
  return (
    <div className="alert">
      <div dangerouslySetInnerHTML={{ __html: message }} />

      <style jsx>
        {`
        .alert {
          background-color: #ebcccc;
          color: #721c24;
          padding: 1.2em 2em;
          font-weight: var(--fontweight-regular);

          @media screen and (min-width: 1200px) {
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
