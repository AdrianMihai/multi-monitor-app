import BroadcastWrappersFactory from '../broadcast/BroadcastWrappersFactory';
import { BaseStore } from './BaseStore';
import { getStoreBroadcastingKey } from './broadcast/StoreBroadcastingKeysPool';

export type PanelsData = {
  activePanel: string;
  isDetached: boolean;
  detachedWindowFeatures: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
};

class PanelsStore extends BaseStore<PanelsData> {
  private wasDetachedPanelProgramaticallyClosed = false;

  constructor() {
    super();

    this.startBroadcastTo(BroadcastWrappersFactory.detachedPanelBroadcastWrapper, getStoreBroadcastingKey(this));
  }

  initializeData(data: PanelsData): void {
    data.activePanel = localStorage.getItem('activePanel') || '';
    data.isDetached = JSON.parse(localStorage.getItem('isPanelDetached') || 'false');
    data.detachedWindowFeatures = localStorage.getItem('detachedPanelWindowFeatures')
      ? JSON.parse(localStorage.getItem('detachedPanelWindowFeatures')!)
      : {
          top: 0,
          left: 0,
          width: 500,
          height: 700,
        };
  }

  changeActivePanel = (panelId: string) => {
    this.update((panelData) => {
      panelData.activePanel = panelId;
    });

    localStorage.setItem('activePanel', panelId);
  };

  get isDetached() {
    return this.data.isDetached;
  }

  detachPanel = () => {
    localStorage.setItem('isPanelDetached', 'true');
    this.update((data) => {
      data.isDetached = true;
    });
  };

  onDeteachedPanelClose = () => {
    if (this.wasDetachedPanelProgramaticallyClosed) return;

    localStorage.setItem('isPanelDetached', 'false');
    this.update((data) => {
      data.isDetached = false;
    });
  };

  saveDetachedPanelWindowFeatures = (windowRef: Window) => {
    if (!windowRef) return;

    this.update((data) => {
      data.detachedWindowFeatures = {
        top: windowRef.screenTop,
        left: windowRef.screenLeft,
        height: windowRef.innerHeight,
        width: windowRef.innerWidth,
      };
    });

    localStorage.setItem('detachedPanelWindowFeatures', JSON.stringify(this.data.detachedWindowFeatures));
  };

  programaticallyCloseDetachedPanel = (windowRef: Window) => {
    this.wasDetachedPanelProgramaticallyClosed = true;
    this.saveDetachedPanelWindowFeatures(windowRef);
  };
}

export default new PanelsStore();
