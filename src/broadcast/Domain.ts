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

const INSTANCE_ID = new Number(Math.floor(Math.random() * 100000)).toString();

export const getInstanceId = () => {
  if (isDetachedWindow()) return window.INSTANCE_ID;

  return INSTANCE_ID;
};

declare global {
  interface Window {
    INSTANCE_ID: string;
  }
}
