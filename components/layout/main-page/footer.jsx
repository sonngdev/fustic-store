function Footer() {
  const currentYear = (new Date()).getFullYear();

  return (
    <footer>
      <div className="media">
        <a href="https://www.instagram.com/fustic.studio">
          <img src="/instagram.png" alt="Fustic on Instagram" className="instagram" />
        </a>
        <a href="https://www.facebook.com/Fustic.studio">
          <img src="/facebook.png" alt="Fustic on Facebook" className="facebook" />
        </a>
        <a href="https://fustic.studio">
          <img src="/eye.png" alt="Fustic Website" className="web" />
        </a>
      </div>

      <div className="copyright">
        All right reserved • @fustic. {currentYear}
      </div>

      <style jsx>
        {`
        footer {
          @media screen and (min-width: 1200px) {
            position: fixed;
            bottom: 0;
            z-index: 1000;
            width: 100%;
            padding: var(--padding-header);

            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;

            .media {
              display: grid;
              grid-template-columns: min-content min-content min-content;
              column-gap: 18px;

              img {
                &.instagram, &.facebook {
                  height: 13px;
                }

                &.web {
                  height: 8px;
                }
              }
            }

            .copyright {
              justify-self: end;
              text-transform: uppercase;
              font-size: var(--fontsize-xs);
              font-weight: var(--fontweight-bold);
            }
          }
        }
        `}
      </style>
    </footer>
  );
}

export default Footer;
