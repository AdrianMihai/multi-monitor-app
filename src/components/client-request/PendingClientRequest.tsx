import React, { useMemo } from 'react';
import {
  StyledHeaderElementsContainer,
  StyledPendingRequestContainer,
  StyledRequestHeaderSeparator,
  StyledRequestTimeText,
  StyledUsernameText,
} from './StyledComponents';
import { ClientRequest } from '../../models/ClientRequest';
import UsersStore from '../../stores/UsersStore';

type PropTypes = {
  requestData: ClientRequest;
};

export const PendingClientRequest = ({ requestData }: PropTypes) => {
  const userData = useMemo(() => UsersStore.findById(requestData.userId), [requestData.id]);
  const parsedRequestTime = useMemo(() => new Date(requestData.timestamp).toLocaleString(), [requestData.timestamp]);

  return (
    <StyledPendingRequestContainer>
      <StyledHeaderElementsContainer>
        <StyledUsernameText>{userData?.username}</StyledUsernameText>
        <StyledRequestTimeText>{parsedRequestTime}</StyledRequestTimeText>
        <StyledRequestHeaderSeparator />
      </StyledHeaderElementsContainer>
      <p>{requestData.content}</p>
    </StyledPendingRequestContainer>
  );
};
