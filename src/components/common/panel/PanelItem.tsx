import React, { useContext } from 'react';
import { PanelComponentsContext } from './PanelComponentsContext';
import { StyledPanelItem } from './StyledComponents';
import { Conditional } from '../Conditional';

const PanelItem = ({ id, children }) => {
  const { activePanel } = useContext(PanelComponentsContext);

  console.log(id, activePanel);

  return (
    <Conditional when={id === activePanel}>
      <StyledPanelItem id={id}>{children}</StyledPanelItem>
    </Conditional>
  );
};

export default PanelItem;
