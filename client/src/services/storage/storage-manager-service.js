import configData from './../../config.json';

export default function storageManagerService(useSessionStorage) {
  let storeObject = (useSessionStorage) ? window.sessionStorage : window.localStorage;

  const storageManagerService = {
    PREFIX: configData.STORAGE_PREFIX,
    SEPARATOR: configData.STORAGE_SEPARATOR,
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
       storeObject.setItem(ensuredKey, JSON.stringify(object));
    },
    getItem: (key) => {
       if (!key) {
          console.error("StorageManagerService empty key");
          return null;
       }
       let ensuredKey = storageManagerService.ensureKey(key);
       let objectString = storeObject.getItem(ensuredKey);
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
  
       return storeObject.getItem(storageManagerService.ensureKey(key)) !== null;
    },
    removeItem: (key) => {
       if (!key) {
          console.error("StorageManagerService empty key");
          return null;
       }
       let ensuredKey = storageManagerService.ensureKey(key);
       if (storageManagerService.hasItem(ensuredKey)) {
          let item = JSON.parse(storeObject.getItem(ensuredKey));
          storeObject.removeItem(ensuredKey);
          return item;
       }
       return null;
    }
  }

  return storageManagerService;
}
