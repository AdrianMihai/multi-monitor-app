import BroadcastWrappersFactory from '../broadcast/BroadcastWrappersFactory';
import { BaseStore } from './BaseStore';
import { getStoreBroadcastingKey } from './broadcast/StoreBroadcastingKeysPool';

export type PanelsData = {
  activePanel: string;
  isDetached: boolean;
};

class PanelsStore extends BaseStore<PanelsData> {
  constructor() {
    super();

    this.startBroadcastTo(BroadcastWrappersFactory.detachedPanelBroadcastWrapper, getStoreBroadcastingKey(this));
  }

  initializeData(data: PanelsData): void {
    data.activePanel = localStorage.getItem('activePanel') || '';
    data.isDetached = false;
  }

  changeActivePanel = (panelId: string) => {
    this.update((panelData) => {
      panelData.activePanel = panelId;
    });

    localStorage.setItem('activePanel', panelId);
  };
}

export default new PanelsStore();
