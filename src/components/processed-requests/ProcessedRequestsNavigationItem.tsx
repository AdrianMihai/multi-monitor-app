import React from 'react';
import { SidePanels } from '../../models/SidePanels';
import PanelNavItem from '../common/panel/navigation/PanelNavItem';
import { SVGIcon } from '../common/icon/SVGIcon';
import { Icons } from '../../resources/Icons';

export const ProcessedRequestsNavigationItem = () => {
  return (
    <PanelNavItem id={SidePanels.requestsHistory}>
      <SVGIcon iconName={Icons.checkedEnvelope} />
    </PanelNavItem>
  );
};
