/**
 * https://stackoverflow.com/a/33604438/9744063
 */
export function isTouchDevice() {
  if ('ontouchstart' in window) return true;
  if (navigator.maxTouchPoints > 0) return true;
  if (navigator.msMaxTouchPoints > 0) return true;
  return false;
}
