import React from 'react';
import { StyledPanelTitleLabel } from './StyledComponents';

export const PanelItemHeader = ({ text = '' }) => {
  return <StyledPanelTitleLabel>{text}</StyledPanelTitleLabel>;
};
