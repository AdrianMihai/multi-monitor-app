import { BehaviorSubject, Subject } from 'rxjs';
import { StoreBroadcastChain } from './broadcast/StoreBroadcastChain';
import { BroadcastChannelWrapper } from '../broadcast/BroadcastChannelWrapper';
import { isDetachedWindow } from '../broadcast/Domain';

export abstract class BaseStore<U> {
  protected data: U;
  private notificationsSubject: Subject<U>;
  private broadcastChain: StoreBroadcastChain;
  public dataSyncObservable = new BehaviorSubject<boolean>(!isDetachedWindow() ? true : false);

  constructor(private readonly storeKey = '') {
    this.notificationsSubject = new Subject();
    this.data = {} as U;
    this.initializeData(this.data);
  }

  abstract initializeData(data: U): void;

  get dataObject() {
    return this.data;
  }

  get isDataSynced() {
    return this.dataSyncObservable.value;
  }

  subscribe(fn: (value: U) => void) {
    return this.notificationsSubject.subscribe(fn);
  }

  setupBroadcastChain(storeKey: string) {
    this.broadcastChain = new StoreBroadcastChain(storeKey);
    this.broadcastChain.onRemoteUpdate = this.handleRemoteUpdate;
    this.broadcastChain.onDataRequest = () => this.broadcastCurrentData();
  }

  update(updateFn: (data: U) => void) {
    if (!this.isDataSynced) return;

    const prevData = this.data;
    this.data = { ...prevData };
    updateFn(this.data);

    this.notificationsSubject.next(this.data);
    this.broadcastCurrentData();
  }

  canBroadcastUpdates = () => !!this.broadcastChain;

  broadcastCurrentData = () => {
    if (!this.canBroadcastUpdates()) return;

    this.broadcastChain.broadcastStoreUpdate(this.getBroadcastData());
  };

  getBroadcastData() {
    return this.dataObject;
  }

  mergeBroadcastData(storeData) {
    this.data = storeData;
  }

  startBroadcastTo(broadcastWrapper: BroadcastChannelWrapper, storeKey: string) {
    if (!this.broadcastChain) {
      this.setupBroadcastChain(storeKey);
    }

    this.broadcastChain.addToChain(broadcastWrapper);
  }

  handleRemoteUpdate = (storeData) => {
    if (!this.isDataSynced) {
      this.dataSyncObservable.next(true);
    }

    this.mergeBroadcastData(storeData);
    this.notificationsSubject.next(this.data);
  };
}
