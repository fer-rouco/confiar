import axios from 'axios';
import { get, post, remove } from './base-service';

const BASE_URL = 'user';

export async function getAllUserProfiles() {
  return get(BASE_URL + '/profiles');
}

export async function findUserById(id) {
  return get(BASE_URL + '/' + id);
}

export async function findUsers(pageFrom, pageSize) {
  var formdata = new FormData();
  formdata.append("pageFrom", pageFrom);
  formdata.append("pageSize", pageSize);
  return post(BASE_URL, formdata);
}

export async function updateUser(updateObject) {
  return post(BASE_URL + '/update', updateObject);
}

export async function deleteUser(userId) {
  return remove(BASE_URL, userId);
}
