import styled from 'styled-components';

export const StyledRequestsHistoryList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
  padding-top: 15px;
`;

export const StyledHistoryEntryContainer = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledEntryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const StyledUserName = styled.h3`
  margin: 0 0 5px 0;
`;

export const StyledEntryTimestamp = styled.em`
  padding: 5px 0;
  margin: 0;
  color: #6a6363;
`;

export const StyledRequestText = styled.p`
  margin: 0 0 12px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledResolutionText = styled.p`
  margin: 0;
  border: 2px solid #4a5f82;
  border-radius: 4px;
  padding: 2px 6px;
`;
