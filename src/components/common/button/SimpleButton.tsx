import React from 'react';
import { StyledSimpleButton } from './StyledComponents';

export const SimpleButton = ({ className = '', disabled = false, children, onClick }) => {
  return (
    <StyledSimpleButton className={className} disabled={disabled} onClick={onClick}>
      {children}
    </StyledSimpleButton>
  );
};
