import { get, post } from './base-service';
import jsSHA from 'jssha';
import storageManagerService from "./../storage/storage-manager-service";
import { STORAGE_SESSION_IDENTIFIER } from './../storage/storage-constants';

const BASE_URL = 'session';
const sessionStorageService = storageManagerService(true);

export async function getSessionInfo() {
  return get(BASE_URL);
}

export async function logIn(user, password) {
  const shaObj = new jsSHA('SHA-256', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(password);
  const hashedPassword = shaObj.getHash('HEX');

  return get(BASE_URL + '/login', {
    params: { userName: user, password: hashedPassword },
  }).then((session) => {
    sessionStorageService.setItem(STORAGE_SESSION_IDENTIFIER, session);
    return session;
  });
}

export async function logOut() {
  return get(
    BASE_URL + '/logout'
  ).then((session) => {
    sessionStorageService.removeItem(STORAGE_SESSION_IDENTIFIER);
    return session;
  });
}

export async function validateSession(token) {
  const headers = {
    'Content-Type': 'text/plain'
  }
  return post(
    BASE_URL + '/validate', token, { headers: headers }
  ).then((session) => {
    return session;
  });
}

export function getCurrentSession() {
  return sessionStorageService.getItem(STORAGE_SESSION_IDENTIFIER);
}
