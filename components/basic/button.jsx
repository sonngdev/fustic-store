/* eslint-disable react/jsx-props-no-spreading */

export default function Button(props) {
  return (
    <>
      <button type="submit" {...props} />

      <style jsx>
        {`
          button {
            padding: 10px 15px;
            color: var(--color-background);
            background-color: var(--color-text);
            border-radius: 3px;
          }
        `}
      </style>
    </>
  );
}
