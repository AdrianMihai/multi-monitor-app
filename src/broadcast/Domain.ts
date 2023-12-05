export enum BroadcastCommandName {
  SHARE_STORE = 'shareStore',
  REQUEST_STORE_SYNC = 'requestStoreSync',
}

export interface BroadcastCommand {
  name: BroadcastCommandName;
  args?: { [key: string]: any };
}

export enum DetachedWindowNames {
  detachedPanel = 'detachedPanel',
}

export const isDetachedWindow = () => (Object.values(DetachedWindowNames) as string[]).includes(window.name);
