import { styled } from 'styled-components';

export const StyledPanelItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  min-width: 400px;
  padding: 7px;
`;

export const StyledPanelElementsContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  border-top: 2px solid gray;
`;

export const StyledPanelTitleLabel = styled.h2`
  margin: 0;
  padding: 1rem;
`;

export const StyledPanelItemBody = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  overflow-y: auto;
`;
