import React from 'react';
import PanelItem from '../common/panel/PanelItem';
import { PanelItemHeader } from '../common/panel/PanelItemHeader';
import { SidePanels } from '../../models/SidePanels';
import { StyledPanelItemBody } from '../common/panel/StyledComponents';
import { RequestsHistoryList } from './RequestsHistoryList';

export const ProcessedRequestsPanel = () => {
  return (
    <PanelItem id={SidePanels.requestsHistory}>
      <PanelItemHeader text="Requests History" />
      <StyledPanelItemBody>
        <RequestsHistoryList />
      </StyledPanelItemBody>
    </PanelItem>
  );
};
