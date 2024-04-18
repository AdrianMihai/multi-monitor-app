import BroadcastWrappersFactory from '../broadcast/BroadcastWrappersFactory';
import { ClientRequest } from '../models/ClientRequest';
import { getRandomString } from '../utils/StringUtils';
import { BaseStore } from './BaseStore';
import { getStoreBroadcastingKey } from './broadcast/StoreBroadcastingKeysPool';

export type ClientRequestsData = {
  requests: ClientRequest[];
};

class RequestsStore extends BaseStore<ClientRequestsData> {
  constructor() {
    super();

    this.startBroadcastTo(BroadcastWrappersFactory.detachedPanelBroadcastWrapper, getStoreBroadcastingKey(this));
  }

  initializeData(storeData: ClientRequestsData) {
    storeData.requests = [];
  }

  get requests() {
    return this.data.requests;
  }

  findById = (clientRequestId: number) => this.data.requests.find((data) => data.id === clientRequestId);

  generateNewRequestId = () => this.data.requests.length + 1;

  addFromUser = (userId: number) => {
    this.update((draft) => {
      draft.requests.push({
        userId,
        id: this.generateNewRequestId(),
        content: getRandomString(75, 400),
        timestamp: new Date().toISOString(),
      });
    });
  };
}

export default new RequestsStore();
