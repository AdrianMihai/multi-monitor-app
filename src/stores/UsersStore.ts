import { User } from '../models/User';
import { BaseStore } from './BaseStore';

export type UsersData = {
  users: User[];
};

class UsersStore extends BaseStore<UsersData> {
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
