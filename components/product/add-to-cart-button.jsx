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
          width: 205px;
          border: solid 1px var(--color-text);
          padding: 12px;
          text-transform: uppercase;
          transition: all ease 0.2s;

          span {
            display: grid;
            grid-template-columns: 45px auto;
            justify-content: center;
            align-items: center;

            img {
              width: 30px;
            }
          }

          &:hover {
            background-color: var(--color-text);
            color: var(--color-background);
            font-weight: var(--fontweight-bold);

            img {
              filter: invert(100%);
            }
          }

          @media screen and (min-width: 1200px) {
            font-size: var(--fontsize-lg);
            padding: 20px;
            width: 295px;

            span {
              grid-template-columns: 60px auto;

              img {
                width: 40px;
              }
            }
          }
        }
        `}
      </style>
    </button>
  );
}

export default AddToCartButton;
