/* eslint-disable no-useless-escape */

import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useDisableBodyScroll from 'hooks/useDisableBodyScroll';
import { getCategories } from 'utils/request';

function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const request = async () => {
      const cs = await getCategories();
      setCategories(cs);
    };
    request();
  }, []);

  return categories;
}

export default function Menu({ visible }) {
  const menu = useRef(null);
  useDisableBodyScroll(menu.current, visible);

  const categories = useCategories();

  const { pathname, asPath } = useRouter();
  const links = [
    { href: '/', as: '/', text: 'Collections' },
    ...categories.map(({ slug, name }) => (
      { href: '/[categorySlug]', as: `/${slug}`, text: name }
    )),
  ];

  return (
    <div className="menu" ref={menu}>
      <div className="item">Products</div>
      <ul>
        {links.map(({ href, as, text }) => (
          <li key={text}>
            <Link href={href} as={as}>
              <a className={cx('subitem', { active: as === '/' ? pathname === '/' : asPath.startsWith(as) })}>
                {text}
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <style jsx>
        {`
        .menu {
          padding: 40px;
          padding-top: calc(var(--height-brand) + 2 * var(--padding-header) + 4rem);

          .item, .subitem {
            display: block;
          }

          .item {
            font-weight: var(--fontweight-bold);
            margin-bottom: 1.5em;
            text-transform: uppercase;
            font-size: var(--fontsize-sm);
          }

          ul {
            list-style: none;
            margin: 0;
            padding: 0;
            margin-bottom: 4rem;

            li {
              margin-bottom: 0.8em;

              .subitem {
                text-transform: uppercase;
                font-size: var(--fontsize-lg);

                &.active::before {
                  content: '\A';
                  width: 0.5em;
                  height: 0.5em;
                  border-radius: 50%;
                  background-color: var(--color-text);
                  position: absolute;
                  margin-top: calc(1em / 3 - 1px);
                  margin-left: calc(1em * -4 / 3);
                }
              }
            }
          }

          @media screen and (min-width: 1200px) {
            padding: 25vh 0 var(--padding-header) var(--padding-header);

            ul li .subitem {
              font-size: var(--fontsize-md);
            }
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
