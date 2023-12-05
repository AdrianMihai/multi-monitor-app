import React from 'react';
import { StyledNavContainer, StyledPanelsNavbarItemsList } from './StyledComponents';

const PanelsNavbar = ({ endDecoration, children }) => {
  return (
    <StyledNavContainer>
      <StyledPanelsNavbarItemsList>{children}</StyledPanelsNavbarItemsList>
      {endDecoration}
    </StyledNavContainer>
  );
};

export default PanelsNavbar;
