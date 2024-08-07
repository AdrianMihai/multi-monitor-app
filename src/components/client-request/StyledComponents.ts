import { styled } from 'styled-components';
import { SimpleButton } from '../common/button/SimpleButton';

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
  bottom: 2px;
  left: 0;
  height: 2px;
  width: 40%;
  background: #4a5f82;
`;

export const StyledUsernameText = styled.h3`
  margin: 0;
`;

export const StyledRequestTimeText = styled.em`
  padding: 5px 0;
  margin: 0;
  color: #6a6363;
`;

export const StyledReplyButton = styled(SimpleButton)`
  flex-direction: row;
  justify-content: space-between;
  min-width: 70px;
  
  .svg-icon {
    max-width: 1rem;
    max-height: 1rem;
  }
`;
