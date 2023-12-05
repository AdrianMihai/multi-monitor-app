import { BroadcastChannelWrapper } from './BroadcastChannelWrapper';

class BroadcastWrappersFactory {
  private _detachedPanelBroadcastWrapper: BroadcastChannelWrapper;
  private broadcastUniqueKey = new Number(Math.random() * 100000).toString();

  get detachedPanelBroadcastWrapper() {
    if (!this._detachedPanelBroadcastWrapper) {
      this._detachedPanelBroadcastWrapper = new BroadcastChannelWrapper(`${this.broadcastUniqueKey}-detached-panel`);
    }

    return this._detachedPanelBroadcastWrapper;
  }
}

export default new BroadcastWrappersFactory();
