import configData from './../../config.json';

let storeObject = sessionStorage;
const storageManagerService = {
  PREFIX: configData.STORAGE_PREFIX,
  SEPARATOR: configData.STORAGE_SEPARATOR,
  setStoreObject: (storage) => {
     storeObject = storage;
  },
  getStoreObject: () => {
    return storeObject;
  },
  ensureKey: (key) => {
     let split = key.split('.');
     if (split.length > 0 && split[0] !== storageManagerService.PREFIX) {
        return storageManagerService.PREFIX + storageManagerService.SEPARATOR + key;
     }
     return key;
  },
  setItem: (key, object) => {
     if (!key) {
        console.error("StorageManagerService empty key");
        return;
     }
     let ensuredKey = storageManagerService.ensureKey(key);
     storageManagerService.getStoreObject().setItem(ensuredKey, JSON.stringify(object));
  },
  getItem: (key) => {
     if (!key) {
        console.error("StorageManagerService empty key");
        return null;
     }
     let ensuredKey = storageManagerService.ensureKey(key);
     let objectString = storageManagerService.getStoreObject().getItem(ensuredKey);
     if (objectString) {
        return JSON.parse(objectString);
     }
     return null;
  },
  hasItem: (key) => {
     if (!key) {
        console.error("StorageManagerService empty key");
        return false;
     }

     return storageManagerService.getStoreObject().getItem(storageManagerService.ensureKey(key)) !== null;
  },
  removeItem: (key) => {
     if (!key) {
        console.error("StorageManagerService empty key");
        return null;
     }
     let ensuredKey = storageManagerService.ensureKey(key);
     if (storageManagerService.hasItem(ensuredKey)) {
        let item = JSON.parse(storageManagerService.getStoreObject().getItem(ensuredKey));
        storageManagerService.getStoreObject().removeItem(ensuredKey);
        return item;
     }
     return null;
  }
}

export default storageManagerService;