import BroadcastWrappersFactory from '../broadcast/BroadcastWrappersFactory';
import { UserQueueEntry } from '../models/UserQueueEntry';
import { BaseStore } from './BaseStore';
import { getStoreBroadcastingKey } from './broadcast/StoreBroadcastingKeysPool';

export type UsersQueueData = {
  queue: UserQueueEntry[];
};

class UsersQueueStore extends BaseStore<UsersQueueData> {
  constructor() {
    super();

    this.startBroadcastTo(BroadcastWrappersFactory.detachedPanelBroadcastWrapper, getStoreBroadcastingKey(this));
  }

  initializeData(store) {
    store.queue = [];
  }

  removeForUser = (userId: number) => {
    this.update((draft) => {
      draft.queue = draft.queue.filter((entry) => entry.userId !== userId);
    });
  };
}

export default new UsersQueueStore();
