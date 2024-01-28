import React from 'react';

import { useStoreObserver } from '../common/UseStoreObserver';
import ProcessedRequestsStore, { ProcessedRequestsData } from '../../stores/ProcessedRequestsStore';
import { ResponseEntry } from './ResponseEntry';
import { StyledRequestsHistoryList } from './StyledComponents';

export const RequestsHistoryList = () => {
  const [{ requestsList }] = useStoreObserver<ProcessedRequestsData>(ProcessedRequestsStore);

  return (
    <StyledRequestsHistoryList>
      {requestsList.map((data) => (
        <ResponseEntry key={`processed-requests-${data.id}`} responseData={data} />
      ))}
    </StyledRequestsHistoryList>
  );
};
