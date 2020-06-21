import { useEffect } from 'react';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

/**
 * https://github.com/willmcpo/body-scroll-lock#readme
 */
export default function useDisableBodyScroll(targetElement, predicate) {
  useEffect(() => {
    if (predicate) {
      disableBodyScroll(targetElement);
    } else {
      clearAllBodyScrollLocks();
    }
  }, [predicate]);
}
