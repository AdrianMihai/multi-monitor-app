import React from 'react';
import { StyledProcessingAreaContainer } from './StyledComponents';
import { PendingRequests } from './PendingRequests';
import { SidePanel } from './SidePanel';

export const RequestsArea = () => {
  return (
    <StyledProcessingAreaContainer>
      <PendingRequests />
      <SidePanel />
    </StyledProcessingAreaContainer>
  );
};
