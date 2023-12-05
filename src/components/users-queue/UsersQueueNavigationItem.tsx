import React from 'react';
import UsersGroup from '../../../assets/UserGroup.svg';
import { SidePanels } from '../../models/SidePanels';
import PanelNavItem from '../common/panel/navigation/PanelNavItem';

export const UsersQueueNavigationItem = () => {
  return (
    <PanelNavItem id={SidePanels.usersQueue}>
      <UsersGroup />
    </PanelNavItem>
  );
};
