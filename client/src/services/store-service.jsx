import { get } from './base-service';

const BASE_URL = 'store';

export async function getStores() {
  return get(BASE_URL);
}
