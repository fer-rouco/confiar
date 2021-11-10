import storageManagerService from "./storage-manager-service";

storageManagerService.setStoreObject(sessionStorage);
const SESSION_IDENTIFIER = 'session';

export function getSession() {
  return storageManagerService.getItem(SESSION_IDENTIFIER);
}

export function setSession(objectValue) {
  storageManagerService.setItem(SESSION_IDENTIFIER, objectValue);
}

export function destroySession() {
  storageManagerService.removeItem(SESSION_IDENTIFIER);
}
