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

  findById = (clientRequestId: number) => this.data.requests.find((data) => data.id === clientRequestId);
}

export default new RequestsStore();
