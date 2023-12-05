import { ClientRequest } from '../models/ClientRequest';
import { BaseStore } from './BaseStore';

export type ClientRequestsData = {
  requests: ClientRequest[];
};

class RequestsStore extends BaseStore<ClientRequestsData> {
  initializeData(storeData: ClientRequestsData) {
    storeData.requests = [];
  }

  get requests() {
    return this.data.requests;
  }
}

export default new RequestsStore();
