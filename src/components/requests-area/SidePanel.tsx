import React from 'react';
import PanelsNavbar from '../common/panel/navigation/PanelsNavbar';
import { UsersQueueNavigationItem } from '../users-queue/UsersQueueNavigationItem';
import { UsersQueuePanel } from '../users-queue/UsersQueuePanel';
import { useStoreObserver } from '../common/UseStoreObserver';
import PanelsStore, { PanelsData } from '../../stores/PanelsStore';
import { Conditional } from '../common/Conditional';
import { NewWindow } from '../common/window/NewWindow';
import { SimpleButton } from '../common/button/SimpleButton';
import { useDetachedSidePanelHandler } from './UseDetachedSidePanelHandler';
import { DetachedWindowNames } from '../../broadcast/Domain';
import { ProcessedRequestsNavigationItem } from '../processed-requests/ProcessedRequestsNavigationItem';
import { ProcessedRequestsPanel } from '../processed-requests/ProcessedRequestsPanel';
import { StyledPanel } from './StyledComponents';
import { SVGIcon } from '../common/icon/SVGIcon';
import { Icons } from '../../resources/Icons';

const onDetachedWindowTriggered = (ev) => {
  ev.nativeEvent.stopImmediatePropagation();

  PanelsStore.detachPanel();
};

export const SidePanel = () => {
  const [panelsData] = useStoreObserver<PanelsData>(PanelsStore);
  const { onOpen, detachedPanelWindowFeatures, onClose } = useDetachedSidePanelHandler(panelsData);
  const { activePanel, isDetached } = panelsData;

  return (
    <>
      <Conditional when={!isDetached || window.name === DetachedWindowNames.detachedPanel}>
        <StyledPanel
          activePanel={activePanel}
          onPanelChange={PanelsStore.changeActivePanel}
          isDetached={isDetached}
          navbar={
            <PanelsNavbar
              endDecoration={
                <Conditional when={!isDetached}>
                  <SimpleButton onClick={onDetachedWindowTriggered}>
                    <SVGIcon iconName={Icons.newWindow} />
                  </SimpleButton>
                </Conditional>
              }
            >
              <UsersQueueNavigationItem />
              <ProcessedRequestsNavigationItem />
            </PanelsNavbar>
          }
        >
          <UsersQueuePanel />
          <ProcessedRequestsPanel />
        </StyledPanel>
      </Conditional>
      <Conditional when={isDetached && window.name !== DetachedWindowNames.detachedPanel}>
        <NewWindow
          windowName={DetachedWindowNames.detachedPanel}
          documentPath={detachedPanelPath}
          windowFeatures={detachedPanelWindowFeatures}
          onOpen={onOpen}
          onClose={onClose}
        />
      </Conditional>
    </>
  );
};
