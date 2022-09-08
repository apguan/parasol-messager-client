import * as SecureStore from "expo-secure-store";

export const SecureStoreHook = () => {
  const saveItem = async (key, value) => {
    let stringifiedObj;
    if (typeof value === "object") {
      stringifiedObj = JSON.stringify(value);
    } else {
      stringifiedObj = value;
    }

    await SecureStore.setItemAsync(key, stringifiedObj);
  };

  const getItem = async (key) => {
    if (!key) {
      return null;
    }

    const stringifedObj = await SecureStore.getItemAsync(key);
    return JSON.parse(stringifedObj);
  };

  const deleteItem = async (key) => {
    if (!key) {
      return false;
    }

    await SecureStore.deleteItemAsync(key);
  };

  return {
    saveItem,
    getItem,
    deleteItem,
  };
};
