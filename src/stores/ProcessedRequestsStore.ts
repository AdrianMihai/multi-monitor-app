import BroadcastWrappersFactory from '../broadcast/BroadcastWrappersFactory';
import { ProcessedRequest, ResponseData, createResponse } from '../models/ProcessedRequest';
import { BaseStore } from './BaseStore';
import { getStoreBroadcastingKey } from './broadcast/StoreBroadcastingKeysPool';

export type ProcessedRequestsData = {
  requestsList: ProcessedRequest[];
};

class ProcessedRequestsStore extends BaseStore<ProcessedRequestsData> {
  constructor() {
    super();

    this.startBroadcastTo(BroadcastWrappersFactory.detachedPanelBroadcastWrapper, getStoreBroadcastingKey(this));
  }

  initializeData(data: ProcessedRequestsData): void {
    data.requestsList = [];
  }

  addNewResponse = (data: ResponseData) => {
    this.update((storeData) => {
      storeData.requestsList = [...storeData.requestsList, createResponse(data, storeData.requestsList)];
    });
  };
}

export default new ProcessedRequestsStore();
