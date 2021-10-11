import { get, post, put, remove as removeById } from './base-service';

const BASE_URL = 'customer';

export async function findCustomerById(id) {
  return get(BASE_URL + '/' + id);
}

export async function getAllCustomers(createObject) {
  return get(BASE_URL);
}

export async function createCustomer(createObject) {
  return post(BASE_URL + '/create', createObject);
}

export async function updateCustomer(updateObject) {
  return put(BASE_URL + '/update', updateObject);
}

export async function removeCustomer(userId) {
  return removeById(BASE_URL, userId);
}
