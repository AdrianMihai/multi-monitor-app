import React from 'react';
import { SidePanels } from '../../models/SidePanels';
import PanelNavItem from '../common/panel/navigation/PanelNavItem';
import { SVGIcon } from '../common/icon/SVGIcon';
import { Icons } from '../../resources/Icons';

export const UsersQueueNavigationItem = () => {
  return (
    <PanelNavItem id={SidePanels.usersQueue}>
      <SVGIcon iconName={Icons.usersGroup} />
    </PanelNavItem>
  );
};
