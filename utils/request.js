import { ensureCamel, ensureSnake } from 'utils/object';

export async function request(method, url, body = null) {
  const options = {
    method,
    headers: { Accept: 'application/json' },
  };
  if (body) options.body = JSON.stringify(body);

  const req = await fetch(url, options);
  const res = await req.json();
  return ensureCamel(res);
}

export function get(url, payload = null) {
  const urlWithSearch = payload ? `${url}?${new URLSearchParams(payload)}` : url;
  return request('GET', urlWithSearch);
}

export function post(url, payload = null) {
  const body = ensureSnake(payload);
  return request('POST', url, body);
}

export function put(url, payload = null) {
  const body = ensureSnake(payload);
  return request('PUT', url, body);
}

export function getCategories() {
  return get(`${process.env.NEXT_PUBLIC_API_HOST}/categories`);
}

export function getCategory(slug) {
  return get(`${process.env.NEXT_PUBLIC_API_HOST}/categories/${slug}`);
}

export function getProducts(categoryId = null) {
  const payload = categoryId ? { 'category.id': categoryId } : null;
  return get(`${process.env.NEXT_PUBLIC_API_HOST}/products`, payload);
}

export function getProduct(slug) {
  return get(`${process.env.NEXT_PUBLIC_API_HOST}/products/${slug}`);
}

export function getGeneralConfig() {
  return get(`${process.env.NEXT_PUBLIC_API_HOST}/general-config`);
}

export async function getVimeoThumbnail(vimeoId) {
  const info = await get(`http://vimeo.com/api/v2/video/${vimeoId}.json`);
  return info[0].thumbnailLarge.replace('.webp', '.jpg');
}

export async function createOrder(type, cart, checkoutInfo) {
  const payload = {
    ...checkoutInfo,
    type,
    products: cart.map((entry) => ({
      product: { id: entry.product.id },
      size: entry.sizeName,
      quantity: entry.quantity,
    })),
  };

  return post(`${process.env.NEXT_PUBLIC_API_HOST}/orders`, payload);
}

export async function updateOrder(id, paypalOrder) {
  const payload = { paypalOrder: JSON.stringify(paypalOrder) };
  return put(`${process.env.NEXT_PUBLIC_API_HOST}/orders/${id}`, payload);
}
