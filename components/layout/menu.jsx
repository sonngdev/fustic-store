import Link from 'next/link';

export default function Menu() {
  return (
    <div className="menu">
      <div className="menu-container">
        <Link href="/"><a className="item">Products</a></Link>
        <ul>
          <li><Link href="/[categorySlug]" as="/t-shirts"><a className="subitem">T-Shirts</a></Link></li>
          <li><Link href="/[categorySlug]" as="/sweaters"><a className="subitem">Sweaters</a></Link></li>
          <li><Link href="/[categorySlug]" as="/hoodies"><a className="subitem">Hoodies</a></Link></li>
          <li><Link href="/[categorySlug]" as="/prints"><a className="subitem">Prints</a></Link></li>
        </ul>

        <Link href="/contact"><a className="item">Contact</a></Link>
        <a href="https://www.instagram.com/notatallstore" className="item">Instagram</a>
        <a href="https://www.facebook.com/notatall.clothing" className="item">Facebook</a>

        <img src="/logo.svg" alt="Logo" className="logo" />
      </div>

      <style jsx>
        {`
        .menu {
          padding: 30px;
          padding-top: calc(var(--height-brand) + 2 * var(--padding-header) + var(--spacing-xxl));

          @media screen and (min-width: 1200px) {
            width: 260px;
          }

          .item, .subitem {
            display: block;
          }

          .item {
            font-weight: bold;
            margin-bottom: var(--spacing-md);
          }

          ul {
            list-style: none;
            margin: 0;
            padding: 0;
            margin-top: var(--spacing-xs);
            margin-bottom: var(--spacing-xxl);

            li {
              margin-bottom: var(--spacing-md);

              .subitem {
                text-transform: uppercase;
              }
            }
          }

          .logo {
            width: 4rem;
            margin-top: var(--spacing-md);
          }
        }
        `}
      </style>
    </div>
  );
}
