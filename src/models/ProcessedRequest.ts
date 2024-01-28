export interface ProcessedRequest {
  id: number;
  clientRequestId: number;
  response: string;
  timestamp: string;
}

export type ResponseData = {
  requestId: number;
  response: string;
};

export const createResponse = (data: ResponseData, previousResponses: ProcessedRequest[]): ProcessedRequest => {
  const allPreviousIds = previousResponses.map((val) => val.id).sort((val, otherVal) => val - otherVal);
  const newResponseId = allPreviousIds[allPreviousIds.length - 1] + 1;

  return {
    id: newResponseId,
    clientRequestId: data.requestId,
    response: data.response,
    timestamp: new Date().toISOString(),
  };
};
