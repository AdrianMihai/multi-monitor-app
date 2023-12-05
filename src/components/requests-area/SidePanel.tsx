import React from 'react';
import Panel from '../common/panel/Panel';
import PanelsNavbar from '../common/panel/navigation/PanelsNavbar';
import { UsersQueueNavigationItem } from '../users-queue/UsersQueueNavigationItem';
import { UsersQueuePanel } from '../users-queue/UsersQueuePanel';
import { useStoreObserver } from '../common/UseStoreObserver';
import PanelsStore, { PanelsData } from '../../stores/PanelsStore';
import WindowRestoreSolid from '../../../assets/WindowRestoreSolid.svg';
import { Conditional } from '../common/Conditional';
import { NewWindow } from '../common/window/NewWindow';
import { SimpleButton } from '../common/button/SimpleButton';
import { useDetachedSidePanelHandler } from './UseDetachedSidePanelHandler';

const DETACHED_WINDOW_NAME = 'detached_panel';

export const SidePanel = () => {
  const [{ activePanel, isDetached }] = useStoreObserver<PanelsData>(PanelsStore);
  const { onOpen, computeDetachedWindowFeatures, onClose } = useDetachedSidePanelHandler();

  console.log(isDetached);
  return (
    <>
      <Conditional when={!isDetached || window.name === DETACHED_WINDOW_NAME}>
        <Panel
          activePanel={activePanel}
          onPanelChange={PanelsStore.changeActivePanel}
          navbar={
            <PanelsNavbar
              endDecoration={
                <Conditional when={!isDetached}>
                  <SimpleButton onClick={onOpen}>
                    <WindowRestoreSolid />
                  </SimpleButton>
                </Conditional>
              }
            >
              <UsersQueueNavigationItem />
            </PanelsNavbar>
          }
        >
          <UsersQueuePanel />
        </Panel>
      </Conditional>
      <Conditional when={isDetached && window.name !== DETACHED_WINDOW_NAME}>
        <NewWindow
          windowName={DETACHED_WINDOW_NAME}
          documentPath={detachedPanelPath}
          windowFeatures={computeDetachedWindowFeatures()}
          onClose={onClose}
        />
      </Conditional>
    </>
  );
};
