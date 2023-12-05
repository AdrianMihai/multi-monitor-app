import React, { useCallback, useContext } from 'react';
import { PanelComponentsContext } from '../PanelComponentsContext';
import { StyledNavItem } from './StyledComponents';

const PanelNavItem = ({ id, children }) => {
  const { activePanel, toggleActivePanel } = useContext(PanelComponentsContext);
  const isActive = activePanel === id;

  const onClick = useCallback(() => {
    toggleActivePanel(id);
  }, [toggleActivePanel, id]);

  return (
    <StyledNavItem id={id} $isActive={isActive} onClick={onClick}>
      {children}
    </StyledNavItem>
  );
};

export default PanelNavItem;
