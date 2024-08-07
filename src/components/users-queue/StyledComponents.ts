import styled from 'styled-components';
import { SimpleButton } from '../common/button/SimpleButton';

export const StyledWaitingUsersList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
  padding-top: 15px;
`;

export const StyledQueuedUserItem = styled.li`
  width: 100%;
`;

export const StyledUserCard = styled.div`
  display: flex;
  padding: 10px;
`;

export const StyledAddUserButton = styled(SimpleButton)`
  justify-content: center;
  width: 30px;
  padding: 4px;
  margin-right: 6px;
`;

export const StyledUsernameText = styled.h3`
  margin: 0;
`;

export const StyledUserQueueTime = styled.em`
  padding: 5px 0;
  margin: 0;
  color: #6a6363;
`;
