import { findById } from './base-service';

const BASE_URL = 'stats';

export async function getStats(storeId) {
  return findById(BASE_URL, storeId);
}
