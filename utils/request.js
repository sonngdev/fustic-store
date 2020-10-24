import { ensureCamel, ensureSnake, objectMap } from 'utils/object';
import { titleCase } from 'utils/string';

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
  const payload = { _sort: 'position:ASC' };

  return get(`${process.env.NEXT_PUBLIC_API_HOST}/categories`, payload);
}

export function getCategory(slug) {
  return get(`${process.env.NEXT_PUBLIC_API_HOST}/categories/${slug}`);
}

export function getProducts(categoryId = null) {
  const payload = { _sort: 'created_at:DESC' };
  if (categoryId) payload['category.id'] = categoryId;

  return get(`${process.env.NEXT_PUBLIC_API_HOST}/products`, payload);
}

export function getProduct(slug) {
  return get(`${process.env.NEXT_PUBLIC_API_HOST}/products/${slug}`);
}

export function getGeneralConfig() {
  return get(`${process.env.NEXT_PUBLIC_API_HOST}/general-config`);
}

export async function getVimeoThumbnail(vimeoId) {
  const info = await get(`https://vimeo.com/api/v2/video/${vimeoId}.json`);
  return info[0].thumbnailLarge.replace('http:', 'https:').replace('.webp', '.jpg');
}

export async function validateOrder(cart) {
  const payload = cart.map((entry) => ({
    product: { id: entry.product.id },
    size: entry.sizeName,
    quantity: entry.quantity,
  }));

  return post(`${process.env.NEXT_PUBLIC_API_HOST}/orders/validations`, payload);
}

export async function createOrder(type, cart, checkoutInfo) {
  const normalized = objectMap(checkoutInfo, titleCase);

  const payload = {
    ...normalized,
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

export async function confirmOrder(orderId) {
  return post(`${process.env.NEXT_PUBLIC_API_HOST}/orders/${orderId}/confirmations`);
}
