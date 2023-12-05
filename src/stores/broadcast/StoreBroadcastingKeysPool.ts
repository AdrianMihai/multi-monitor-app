import { BaseStore } from '../BaseStore';

const StoreKeysPool: Set<string> = new Set();

export const getStoreBroadcastingKey = (dataStore: BaseStore<any>) => {
  const newStoreKey = dataStore.constructor.name;

  StoreKeysPool.add(newStoreKey);

  return newStoreKey;
};
