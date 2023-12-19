/* global chrome */

// check if storage is available; return boolean value
async function storageAvailable(type) {
  let storage;
  try {
    storage = chrome.storage[type];
    const x = '__storage_test__';
    await storage.set({ x });
    await storage.remove(['x']);
    return true;
  } catch (e) {
    return false;
  }
}

// store location in local storage
function serializeLocation(location) {
  chrome.storage.local.set({ wceLocation: location });
}

// store system name in local storage
function serializeSystem(system) {
  chrome.storage.local.set({ wceSystem: system });
}

// return item (location or system name) from local storage
async function deserialize(key) {
  try {
    const result = await chrome.storage.local.get([key]);
    return result[key];
  } catch (e) {
    return e;
  }
}

export { storageAvailable, serializeLocation, serializeSystem, deserialize };
