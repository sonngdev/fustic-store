/* eslint-disable react/jsx-props-no-spreading */

export default function Select(props) {
  return (
    <div className="select">
      <select {...props} />

      <style jsx>
        {`
        .select {
          display: inline-block;
          position: relative;

          select {
            appearance: none;
            padding: 3px 7px;
            min-width: 3.5rem;
            background-color: transparent;
            border: solid 1px var(--color-text);
            border-radius: 5px;
            color: var(--color-text);
            position: relative;
            z-index: 1;

            &::-ms-expand {
              display: none;
            }
          }

          &::after {
            content: ">";
            font-weight: 300;
            transform: rotate(90deg);
            color: var(--color-text);
            display: inline-block;
            position: absolute;
            right: 8px;
            top: 5px;
            z-index: 0;
            line-height: var(--fontsize-md);
          }
        }
        `}
      </style>
    </div>
  );
}
