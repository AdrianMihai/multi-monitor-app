import React from 'react';
import { useStoreObserver } from '../common/UseStoreObserver';
import UsersQueueStore, { UsersQueueData } from '../../stores/UsersQueueStore';
import {
  StyledQueuedUserItem,
  StyledUserCard,
  StyledUserQueueTime,
  StyledUsernameText,
  StyledWaitingUsersList,
} from './StyledComponents';
import UsersStore from '../../stores/UsersStore';

export const WaitingUsersList = () => {
  const [queueData] = useStoreObserver<UsersQueueData>(UsersQueueStore);

  return (
    <StyledWaitingUsersList>
      {queueData.queue.map((entry) => (
        <StyledQueuedUserItem key={`queued-user-${entry.id}`}>
          <StyledUserCard>
            <StyledUsernameText>{UsersStore.findById(entry.userId)?.username}</StyledUsernameText>
            <StyledUserQueueTime>{`From: ${new Date(entry.timestamp).toLocaleString()}`}</StyledUserQueueTime>
          </StyledUserCard>
        </StyledQueuedUserItem>
      ))}
    </StyledWaitingUsersList>
  );
};
