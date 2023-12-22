import { BaseStore } from '../../stores/BaseStore';
import { useState, useEffect } from 'react';

export function useStoreObserver<U>(store: BaseStore<U>) {
  const [data, setData] = useState<U>(store.dataObject);

  useEffect(() => {
    setData(store.dataObject);
    const notificationObserver = store.subscribe((nextData) => setData(nextData));

    return () => notificationObserver.unsubscribe();
  }, []);

  return [data];
}
