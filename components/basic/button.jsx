/* eslint-disable react/jsx-props-no-spreading */

import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Button = forwardRef(({
  block, solid, className, ...rest
}, ref) => (
  <>
    <button
      {...rest}
      ref={ref}
      type="submit"
      className={cx(className, { block, solid })}
    />

    <style jsx>
      {`
      button {
        font-size: var(--fontsize-sm);
        text-transform: uppercase;

        padding: 15px 25px;
        border: solid 1px var(--color-text);
        color: var(--color-text);

        &:enabled {
          background-color: transparent;
          transition-property: background-color, color;
          transition: ease 0.2s;

          &:hover {
            background-color: var(--color-text);
            color: var(--color-background);
            font-weight: var(--fontweight-bold);
          }
        }

        &.block {
          width: 100%;
        }

        &.solid {
          background-color: var(--color-text);
          color: var(--color-background);
          font-weight: var(--fontweight-bold);

          &:hover {
            opacity: 0.8;
          }
        }

        @media screen and (min-width: 1200px) {
          font-size: var(--fontsize-md);
          font-weight: var(--fontweight-bold);
          padding: 23px 25px;
        }
      }
      `}
    </style>
  </>
));

Button.propTypes = {
  block: PropTypes.bool,
  solid: PropTypes.bool,
  className: PropTypes.string,
};

Button.defaultProps = {
  block: false,
  solid: false,
  className: '',
};

export default Button;
