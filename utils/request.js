import { ensureCamel } from 'utils/object';

export async function get(url) {
  const req = await fetch(url, { headers: { Accept: 'application/json' } });
  const res = await req.json();
  return ensureCamel(res);
}

export function getCategories() {
  return get(`${process.env.NEXT_PUBLIC_API_HOST}/categories`);
}

export function getCategory(slug) {
  return get(`${process.env.NEXT_PUBLIC_API_HOST}/categories/${slug}`);
}

export function getProducts(categoryId = null) {
  return categoryId
    ? get(`${process.env.NEXT_PUBLIC_API_HOST}/products?category.id=${categoryId}`)
    : get(`${process.env.NEXT_PUBLIC_API_HOST}/products`);
}

export function getProduct(slug) {
  return get(`${process.env.NEXT_PUBLIC_API_HOST}/products/${slug}`);
}

export function getGeneralConfig() {
  return get(`${process.env.NEXT_PUBLIC_API_HOST}/general-config`);
}
