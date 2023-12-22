import { BroadcastChannelWrapper } from '../../broadcast/BroadcastChannelWrapper';
import { BroadcastCommandName, isDetachedWindow } from '../../broadcast/Domain';

export class StoreBroadcastChain {
  private broadcastChain: BroadcastChannelWrapper[];
  private remoteUpdateHandler: (storeData: any) => void;
  private requestedDataHandler: () => void;

  constructor(private storeKey: string) {
    this.broadcastChain = [];
  }

  set onRemoteUpdate(callback: (storeData: any) => void) {
    this.remoteUpdateHandler = callback;
  }

  set onDataRequest(callback: () => void) {
    this.requestedDataHandler = callback;
  }

  broadcastStoreUpdate = (storeData: any) => {
    for (const broadcastChannel of this.broadcastChain) {
      broadcastChannel.sendCommand({
        name: BroadcastCommandName.SHARE_STORE,
        args: {
          storeKey: this.storeKey,
          storeData,
        },
      });
    }
  };

  addToChain = (broadcastWrapper: BroadcastChannelWrapper) => {
    this.broadcastChain.push(broadcastWrapper);

    broadcastWrapper.subscribe(BroadcastCommandName.SHARE_STORE, (args) => {
      if (!args || args?.storeKey !== this.storeKey) return;

      this.remoteUpdateHandler(args?.storeData);
    });

    if (isDetachedWindow()) {
      broadcastWrapper.sendCommand({
        name: BroadcastCommandName.REQUEST_STORE_SYNC,
        args: {
          storeKey: this.storeKey,
        },
      });
    } else {
      broadcastWrapper.subscribe(BroadcastCommandName.REQUEST_STORE_SYNC, (args) => {
        if (!args || args?.storeKey !== this.storeKey) return;

        this.requestedDataHandler();
      });
    }
  };
}
