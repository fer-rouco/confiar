import { get, post, remove as removeById } from './base-service';

const BASE_URL = 'customer';

export async function findCustomerById(id) {
  return get(BASE_URL + '/' + id);
}

export async function getAllCustomers(createObject) {
  return get(BASE_URL);
}

export async function updateCustomer(updateObject) {
  return post(BASE_URL + '/update', updateObject);
}

export async function removeCustomer(userId) {
  return removeById(BASE_URL, userId);
}
