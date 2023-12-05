import { styled } from 'styled-components';

export const StyledPendingRequestContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export const StyledHeaderElementsContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 5px;
`;

export const StyledRequestHeaderSeparator = styled.div`
  position: absolute;
  bottom: 1px;
  left: 0;
  height: 1px;
  width: 40%;
  background: violet;
`;

export const StyledUsernameText = styled.h3`
  margin: 0;
`;

export const StyledRequestTimeText = styled.em`
  padding: 5px 0;
  margin: 0;
  color: #6a6363;
`;
