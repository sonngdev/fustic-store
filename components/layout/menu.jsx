import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Menu() {
  const { asPath } = useRouter();

  const links = [
    { href: '/', as: '/', text: 'Collections' },
    { href: '/[categorySlug]', as: '/t-shirts', text: 'T-Shirts' },
    { href: '/[categorySlug]', as: '/sweaters', text: 'Sweaters' },
    { href: '/[categorySlug]', as: '/hoodies', text: 'Hoodies' },
    { href: '/[categorySlug]', as: '/prints', text: 'Prints' },
  ];

  return (
    <div className="menu">
      <div className="menu-container">
        <div className="item">Products</div>
        <ul>
          {links.map(({ href, as, text }) => (
            <li key={text}>
              <Link href={href} as={as}>
                <a className={`subitem ${as === asPath ? 'active' : ''}`}>
                  {text}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>
        {`
        .menu {
          padding: 40px;
          padding-top: calc(var(--height-brand) + 2 * var(--padding-header) + var(--spacing-xxl));

          @media screen and (min-width: 1200px) {
            width: 230px;
          }

          .item, .subitem {
            display: block;
          }

          .item {
            font-weight: var(--fontweight-bold);
            margin-bottom: var(--spacing-lg);
            text-transform: uppercase;
            font-size: var(--fontsize-small);
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

                &.active::before {
                  content: '\A';
                  width: 7px;
                  height: 7px;
                  border-radius: 50%;
                  background-color: var(--color-text);
                  position: absolute;
                  margin: 5px -20px;
                }
              }
            }
          }
        }
        `}
      </style>
    </div>
  );
}
