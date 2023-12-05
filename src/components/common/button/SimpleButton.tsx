import React from 'react';
import { StyledSimpleButton } from './StyledComponents';

export const SimpleButton = ({ children, onClick }) => {
  return <StyledSimpleButton onClick={onClick}>{children}</StyledSimpleButton>;
};
