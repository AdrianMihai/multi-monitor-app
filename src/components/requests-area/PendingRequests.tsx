import React, { useMemo } from 'react';
import { useStoreObserver } from '../common/UseStoreObserver';
import RequestsStore, { ClientRequestsData } from '../../stores/RequestsStore';
import { PendingClientRequest } from '../client-request/PendingClientRequest';
import { StyledPendingRequestsList } from './StyledComponents';
import ProcessedRequestsStore, { ProcessedRequestsData } from '../../stores/ProcessedRequestsStore';

export const PendingRequests = () => {
  const [{ requests }] = useStoreObserver<ClientRequestsData>(RequestsStore);
  const [{ requestsList }] = useStoreObserver<ProcessedRequestsData>(ProcessedRequestsStore);

  const processedRequestsIds = useMemo(() => requestsList.map((value) => value.clientRequestId), [requestsList]);

  return (
    <StyledPendingRequestsList>
      {requests
        .filter((requestData) => !processedRequestsIds.includes(requestData.id))
        .map((requestData) => (
          <PendingClientRequest key={`pending-client-request-${requestData.id}`} requestData={requestData} />
        ))}
    </StyledPendingRequestsList>
  );
};
