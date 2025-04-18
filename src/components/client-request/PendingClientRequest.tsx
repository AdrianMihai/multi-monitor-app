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
import { Conditional } from '../common/Conditional';
import { ResponseForm } from './response-form/ResponseForm';
import { ClientRequestContext } from './ClientRequestContext';
import { SVGIcon } from '../common/icon/SVGIcon';
import { Icons } from '../../resources/Icons';

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
              <SVGIcon iconName={Icons.replyArrow} />
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
