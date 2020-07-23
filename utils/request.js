import { ensureCamel } from 'utils/object';

export async function get(url) {
  const req = await fetch(url);
  const res = await req.json();
  return ensureCamel(res);
}
