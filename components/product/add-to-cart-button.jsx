function AddToCartButton() {
  return (
    <button type="button" className="add-to-cart">
      <span>
        <img src="/eye.png" alt="Eye" />
        Add to cart
      </span>

      <style jsx>
        {`
        .add-to-cart {
          width: 100%;
          border: solid 1px var(--color-text);
          padding: 12px;
          text-transform: uppercase;
          transition: all ease 0.2s;

          span {
            display: grid;
            grid-template-columns: 45px auto;
            justify-content: center;
            align-items: center;
          }

          img {
            width: 30px;
          }

          &:hover {
            background-color: var(--color-text);
            color: var(--color-background);
            font-weight: var(--fontweight-bold);

            img {
              filter: invert(100%);
            }
          }
        }
        `}
      </style>
    </button>
  );
}

export default AddToCartButton;
