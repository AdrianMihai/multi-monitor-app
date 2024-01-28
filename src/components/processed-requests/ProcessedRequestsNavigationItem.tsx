import React from 'react';
import { SidePanels } from '../../models/SidePanels';
import PanelNavItem from '../common/panel/navigation/PanelNavItem';
import CheckedEnvelope from '../../../assets/CheckedEnvelope.svg';

export const ProcessedRequestsNavigationItem = () => {
  return (
    <PanelNavItem id={SidePanels.requestsHistory}>
      <CheckedEnvelope />
    </PanelNavItem>
  );
};
