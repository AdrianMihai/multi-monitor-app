import { useCallback, useMemo, useState } from 'react';
import { ClientRequest } from '../../models/ClientRequest';
import UsersStore from '../../stores/UsersStore';
import ProcessedRequestsStore from '../../stores/ProcessedRequestsStore';

export const useClientRequestData = (requestData: ClientRequest) => {
  const [isReplying, setIsReplying] = useState(false);

  const startReplying = useCallback(() => setIsReplying(true), []);

  const stopReplying = useCallback(() => setIsReplying(false), []);

  const sendReply = useCallback(
    (responseContent: string) => {
      setIsReplying(false);
      ProcessedRequestsStore.addNewResponse({
        requestId: requestData.id,
        response: responseContent,
      });
    },
    [requestData]
  );

  const userData = useMemo(() => UsersStore.findById(requestData.userId), [requestData.id]);
  const parsedRequestTime = useMemo(() => new Date(requestData.timestamp).toLocaleString(), [requestData.timestamp]);

  return { isReplying, startReplying, stopReplying, sendReply, userData, parsedRequestTime };
};
