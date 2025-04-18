import React from 'react';
import { useStoreObserver } from '../common/UseStoreObserver';
import UsersQueueStore, { UsersQueueData } from '../../stores/UsersQueueStore';
import {
  StyledAddUserButton,
  StyledQueuedUserItem,
  StyledUserCard,
  StyledUserQueueTime,
  StyledUsernameText,
  StyledWaitingUsersList,
} from './StyledComponents';
import UsersStore from '../../stores/UsersStore';
import RequestsStore from '../../stores/RequestsStore';
import { SVGIcon } from '../common/icon/SVGIcon';
import { Icons } from '../../resources/Icons';

export const WaitingUsersList = () => {
  const [queueData] = useStoreObserver<UsersQueueData>(UsersQueueStore);

  return (
    <StyledWaitingUsersList>
      {queueData.queue.map((entry) => (
        <StyledQueuedUserItem key={`queued-user-${entry.id}`}>
          <StyledUserCard>
            <StyledAddUserButton
              onClick={() => {
                RequestsStore.addFromUser(entry.userId);
                UsersQueueStore.removeForUser(entry.userId);
              }}
            >
              <SVGIcon iconName={Icons.addPerson} />
            </StyledAddUserButton>
            <div>
              <StyledUsernameText>{UsersStore.findById(entry.userId)?.username}</StyledUsernameText>
              <StyledUserQueueTime>{`From: ${new Date(entry.timestamp).toLocaleString()}`}</StyledUserQueueTime>
            </div>
          </StyledUserCard>
        </StyledQueuedUserItem>
      ))}
    </StyledWaitingUsersList>
  );
};
