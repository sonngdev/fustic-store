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
                padding-left: 23px;
                cursor: pointer;
                line-height: 1.4;
                display: inline-block;
                color: var(--color-text);

                &::before {
                  content: '';
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 12px;
                  height: 12px;
                  border: 2px solid var(--color-text);
                  border-radius: 100%;
                  background: var(--color-background);
                }

                &::after {
                  content: '';
                  width: 6px;
                  height: 6px;
                  background: var(--color-text);
                  position: absolute;
                  top: 5px;
                  left: 5px;
                  border-radius: 100%;
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
