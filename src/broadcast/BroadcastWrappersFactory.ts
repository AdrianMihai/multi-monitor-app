import { BroadcastChannelWrapper } from './BroadcastChannelWrapper';
import { getInstanceId } from './Domain';

class BroadcastWrappersFactory {
  private _detachedPanelBroadcastWrapper: BroadcastChannelWrapper;
  private broadcastUniqueKey = getInstanceId();

  get detachedPanelBroadcastWrapper() {
    if (!this._detachedPanelBroadcastWrapper) {
      this._detachedPanelBroadcastWrapper = new BroadcastChannelWrapper(`${this.broadcastUniqueKey}-detached-panel`);
    }

    return this._detachedPanelBroadcastWrapper;
  }
}

export default new BroadcastWrappersFactory();
