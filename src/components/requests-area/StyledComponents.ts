import { styled } from 'styled-components';

export const StyledProcessingAreaContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 1;
  width: 100%;
  height: calc(100% - 75px);
`;

export const StyledPendingRequestsList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;
