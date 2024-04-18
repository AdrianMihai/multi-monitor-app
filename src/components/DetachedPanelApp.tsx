import React from 'react';
import RequestsStore from '../stores/RequestsStore';
import UsersStore from '../stores/UsersStore';
import { Conditional } from './common/Conditional';
import { useStoresDataSync } from './common/broadcast/UseStoresDataSync';
import { SidePanel } from './requests-area/SidePanel';

export const DetachedPanelApp = () => {
  const areStoresSynced = useStoresDataSync(UsersStore, RequestsStore);

  return (
    <Conditional when={areStoresSynced}>
      <SidePanel />
    </Conditional>
  );
};
