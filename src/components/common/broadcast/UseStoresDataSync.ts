import { useEffect, useState } from 'react';
import { zip } from 'rxjs';

export const useStoresDataSync = (...dataStores) => {
  const [areAllSynced, setAreAllSynced] = useState(false);

  useEffect(() => {
    if (areAllSynced) return;

    const onUpdate = (values) => {
      console.log(values);
      if (values.some((isDataSynced) => !isDataSynced)) {
        return;
      }

      setAreAllSynced(true);
    };

    const storesSyncObserver = zip(dataStores.map((instance) => instance.dataSyncObservable)).subscribe(onUpdate);

    return () => storesSyncObserver.unsubscribe();
  }, [areAllSynced]);
  return areAllSynced;
};
