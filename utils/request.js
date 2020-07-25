import { ensureCamel } from 'utils/object';

export async function get(url) {
  const req = await fetch(url, { headers: { Accept: 'application/json' } });
  const res = await req.json();
  return ensureCamel(res);
}

export function getCategories() {
  return get('http://localhost:3001/categories');
}

export function getCategory(slug) {
  return get(`http://localhost:3001/categories/${slug}`);
}

export function getProducts(categoryId = null) {
  return categoryId
    ? get(`http://localhost:3001/products?category_id=${categoryId}`)
    : get('http://localhost:3001/products');
}

export function getProduct(slug) {
  return get(`http://localhost:3001/products/${slug}`);
}

export function getActiveGeneralConfig() {
  return get('http://localhost:3001/general_configs/active');
}
