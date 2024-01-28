import React from 'react';
import {
  StyledHeaderElementsContainer,
  StyledPendingRequestContainer,
  StyledReplyButton,
  StyledRequestHeaderSeparator,
  StyledRequestTimeText,
  StyledUsernameText,
} from './StyledComponents';
import { ClientRequest } from '../../models/ClientRequest';
import { useClientRequestData } from './UseClientRequestData';
import Reply from '../../../assets/reply.svg';
import { Conditional } from '../common/Conditional';
import { ResponseForm } from './response-form/ResponseForm';
import { ClientRequestContext } from './ClientRequestContext';

type PropTypes = {
  requestData: ClientRequest;
};

export const PendingClientRequest = ({ requestData }: PropTypes) => {
  const { userData, parsedRequestTime, startReplying, stopReplying, isReplying, sendReply } =
    useClientRequestData(requestData);

  return (
    <ClientRequestContext.Provider value={{ stopReplying, sendReply }}>
      <StyledPendingRequestContainer>
        <StyledHeaderElementsContainer>
          <StyledUsernameText>{userData?.username}</StyledUsernameText>
          <StyledRequestTimeText>{parsedRequestTime}</StyledRequestTimeText>
          <StyledRequestHeaderSeparator />
        </StyledHeaderElementsContainer>
        <p>{requestData.content}</p>
        <Conditional when={!isReplying}>
          <div>
            <StyledReplyButton onClick={startReplying}>
              <Reply />
              Reply
            </StyledReplyButton>
          </div>
        </Conditional>
        <Conditional when={isReplying}>
          <ResponseForm />
        </Conditional>
      </StyledPendingRequestContainer>
    </ClientRequestContext.Provider>
  );
};
