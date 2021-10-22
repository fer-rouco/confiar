import { get, post, postPaginator, remove } from './base-service';

const BASE_URL = 'user';

export async function getAllUserProfiles() {
  return get(BASE_URL + '/profiles');
}

export async function findUserById(id) {
  return get(BASE_URL + '/' + id);
}

export async function findUsers(pageFrom, pageSize) {
  return postPaginator(BASE_URL, pageFrom, pageSize);
}

export async function updateUser(updateObject) {
  return post(BASE_URL + '/update', updateObject);
}

export async function deleteUser(userId) {
  return remove(BASE_URL, userId);
}
