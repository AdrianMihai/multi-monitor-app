import React from 'react';
import { useStoreObserver } from '../common/UseStoreObserver';
import RequestsStore, { ClientRequestsData } from '../../stores/RequestsStore';
import { PendingClientRequest } from '../client-request/PendingClientRequest';
import { StyledPendingRequestsList } from './StyledComponents';

export const PendingRequests = () => {
  const [{ requests }] = useStoreObserver<ClientRequestsData>(RequestsStore);

  return (
    <StyledPendingRequestsList>
      {requests.map((requestData) => (
        <PendingClientRequest key={`pending-client-request-${requestData.id}`} requestData={requestData} />
      ))}
    </StyledPendingRequestsList>
  );
};
