import { get } from './base-service';
import jsSHA from 'jssha';

const BASE_URL = 'session';

export async function getSessionInfo() {
  return get(BASE_URL);
}

export async function logIn(user, password) {
  const shaObj = new jsSHA('SHA-256', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(password);
  const hashedPassword = shaObj.getHash('HEX');

  return get(BASE_URL + '/login', {
    params: { user, password: hashedPassword },
  });
}

export async function logOut() {
  return get(BASE_URL + '/logout');
}
