/* eslint-disable react/jsx-props-no-spreading */

import PropTypes from 'prop-types';

function Radio({ id, label, ...rest }) {
  return (
    <div className="radio">
      <input {...rest} type="radio" id={id} />
      <label htmlFor={id}>{label}</label>

      <style jsx>
        {`
        .radio {
          margin-bottom: 0.8em;

          [type="radio"]:checked,
          [type="radio"]:not(:checked) {
            position: absolute;
            left: -9999px;

            + label {
              position: relative;
              padding-left: 2em;
              cursor: pointer;
              line-height: 1.4;
              display: inline-block;
              color: var(--color-text);
              text-transform: uppercase;

              &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 1em;
                height: 1em;
                border: 0.167em solid var(--color-text);
                border-radius: 50%;
                background: var(--color-background);
              }

              &::after {
                content: '';
                width: 0.55em;
                height: 0.55em;
                background: var(--color-text);
                position: absolute;
                top: 0.4em;
                left: 0.4em;
                transform: translate(-50%, -50%);
                border-radius: 50%;
                transition: all 0.2s ease;
              }
            }
          }

          [type="radio"]:not(:checked) + label:after {
              opacity: 0;
              transform: scale(0);
          }

          [type="radio"]:checked + label:after {
              opacity: 1;
              transform: scale(1);
          }

          @media screen and (min-width: 1800px) {
            font-size: 25px;
          }
        }
        `}
      </style>
    </div>
  );
}

Radio.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
};

Radio.defaultProps = {
  label: '',
};

export default Radio;
