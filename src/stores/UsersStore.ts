import BroadcastWrappersFactory from '../broadcast/BroadcastWrappersFactory';
import { User } from '../models/User';
import { BaseStore } from './BaseStore';
import { getStoreBroadcastingKey } from './broadcast/StoreBroadcastingKeysPool';

export type UsersData = {
  users: User[];
};

class UsersStore extends BaseStore<UsersData> {
  constructor() {
    super();

    this.startBroadcastTo(BroadcastWrappersFactory.detachedPanelBroadcastWrapper, getStoreBroadcastingKey(this));
  }

  initializeData(storeData) {
    storeData.users = [];
  }

  get users() {
    return this.dataObject.users;
  }

  addUser(userData: User) {
    this.update((storeData) => {
      storeData.users.push(userData);
    });
  }

  findById = (userId: number) => this.users.find((userData) => userData.id === userId);
}

export default new UsersStore();
