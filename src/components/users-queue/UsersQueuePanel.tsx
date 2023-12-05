import React from 'react';
import { SidePanels } from '../../models/SidePanels';
import PanelItem from '../common/panel/PanelItem';
import { PanelItemHeader } from '../common/panel/PanelItemHeader';
import { StyledPanelItemBody } from '../common/panel/StyledComponents';
import { WaitingUsersList } from './WaitingUsersList';

export const UsersQueuePanel = () => {
  return (
    <PanelItem id={SidePanels.usersQueue}>
      <PanelItemHeader text="Users Queue" />
      <StyledPanelItemBody>
        <WaitingUsersList />
      </StyledPanelItemBody>
    </PanelItem>
  );
};
