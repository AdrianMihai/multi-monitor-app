import { createContext } from 'react';

export type ClientRequestData = {
  stopReplying: () => void;
  sendReply: (responseContent: string) => void;
};

export const ClientRequestContext = createContext<ClientRequestData>({
  stopReplying: () => {},
  sendReply: () => {},
});
