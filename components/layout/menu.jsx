/* eslint-disable no-useless-escape */

import { useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import useDisableBodyScroll from 'hooks/useDisableBodyScroll';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Menu({ visible }) {
  const menu = useRef(null);
  useDisableBodyScroll(menu.current, visible);

  const { asPath } = useRouter();

  const links = [
    { href: '/', as: '/', text: 'Collections' },
    { href: '/[categorySlug]', as: '/t-shirts', text: 'T-Shirts' },
    { href: '/[categorySlug]', as: '/sweaters', text: 'Sweaters' },
    { href: '/[categorySlug]', as: '/hoodies', text: 'Hoodies' },
    { href: '/[categorySlug]', as: '/prints', text: 'Prints' },
  ];

  return (
    <div className="menu" ref={menu}>
      <div className="item">Products</div>
      <ul>
        {links.map(({ href, as, text }) => (
          <li key={text}>
            <Link href={href} as={as}>
              <a className={cx('subitem', { active: as === '/' ? asPath === '/' : asPath.startsWith(as) })}>
                {text}
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <style jsx>
        {`
        .menu {
          --fontsize-menu-subitem: var(--fontsize-lg);

          padding: 40px;
          padding-top: calc(var(--height-brand) + 2 * var(--padding-header) + var(--spacing-xxl));

          .item, .subitem {
            display: block;
          }

          .item {
            font-weight: var(--fontweight-bold);
            margin-bottom: var(--spacing-md);
            text-transform: uppercase;
            font-size: var(--fontsize-sm);
          }

          ul {
            list-style: none;
            margin: 0;
            padding: 0;
            margin-bottom: var(--spacing-xxl);

            li {
              margin-bottom: var(--spacing-sm);

              .subitem {
                text-transform: uppercase;
                font-size: var(--fontsize-menu-subitem);

                &.active::before {
                  content: '\A';
                  width: calc(var(--fontsize-menu-subitem) / 2);
                  height: calc(var(--fontsize-menu-subitem) / 2);
                  border-radius: 50%;
                  background-color: var(--color-text);
                  position: absolute;
                  margin-top: calc(var(--fontsize-menu-subitem) / 3 - 1px);
                  margin-left: calc(var(--fontsize-menu-subitem) * -4 / 3);
                }
              }
            }
          }

          @media screen and (min-width: 1200px) {
            --fontsize-menu-subitem: var(--fontsize-md);

            padding: 25vh 0 var(--padding-header) var(--padding-header);
          }
        }
        `}
      </style>
    </div>
  );
}

Menu.propTypes = {
  visible: PropTypes.bool.isRequired,
};
