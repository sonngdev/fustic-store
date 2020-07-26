/* eslint-disable react/jsx-props-no-spreading */

export default function Select(props) {
  return (
    <div className="select">
      <select {...props} />
      <img src="/icons/caret-down.svg" alt="Caret" className="caret" />

      <style jsx>
        {`
        .select {
          display: inline-block;
          position: relative;
          width: 100%;

          select {
            appearance: none;
            position: relative;
            z-index: 1;

            color: var(--color-text);
            border: solid 1px rgba(white, 0.4);
            border-radius: 0;
            background-color: transparent;
            padding: 12px;
            padding-right: 22px;
            width: 100%;
            font-size: var(--fontsize-md);
            text-transform: uppercase;


            &::-ms-expand {
              display: none;
            }
          }

          .caret {
            position: absolute;
            right: 10px;
            top: 16px;
            z-index: 0;
            width: 8px;
            height: 8px;
            opacity: 0.4;
          }
        }
        `}
      </style>
    </div>
  );
}
