import { useMemo } from 'react';
import { ProcessedRequest } from '../../models/ProcessedRequest';
import RequestsStore from '../../stores/RequestsStore';
import {
  StyledEntryHeader,
  StyledEntryTimestamp,
  StyledHistoryEntryContainer,
  StyledRequestText,
  StyledResolutionText,
  StyledUserName,
} from './StyledComponents';
import React from 'react';
import UsersStore from '../../stores/UsersStore';
import { generateMarkup } from '../../models/TextMarkup';

export interface PropsType {
  responseData: ProcessedRequest;
}

export const ResponseEntry = ({ responseData }: PropsType) => {
  const requestData = useMemo(() => RequestsStore.findById(responseData.clientRequestId), [responseData]);

  return (
    <StyledHistoryEntryContainer>
      <StyledEntryHeader>
        <StyledUserName>{UsersStore.findById(requestData.userId).username}</StyledUserName>
        <StyledEntryTimestamp>{new Date(requestData.timestamp).toLocaleString()}</StyledEntryTimestamp>
      </StyledEntryHeader>
      <StyledRequestText>{requestData.content}</StyledRequestText>
      <StyledResolutionText dangerouslySetInnerHTML={{ __html: generateMarkup(responseData.response) as string }} />
    </StyledHistoryEntryContainer>
  );
};
