import React, { useEffect } from 'react';
import { StyledPageTitle, StyledViewportContainer } from './StyledComponents';
import { RequestsArea } from './requests-area/RequestsArea';
import UsersStore from '../stores/UsersStore';
import { generateRandomUserName } from '../models/User';
import RequestsStore from '../stores/RequestsStore';
import { getRandomString } from '../utils/StringUtils';
import { generateRandomRecentDate } from '../utils/DateUtils';
import UsersQueueStore from '../stores/UsersQueueStore';

export const App = () => {
  useEffect(() => {
    for (let idx = 1; idx <= 20; ++idx) {
      UsersStore.addUser({ id: idx, username: generateRandomUserName() });
    }

    for (let idx = 1; idx <= 20; ++idx) {
      RequestsStore.update((data) => {
        data.requests.push({
          id: idx,
          userId: Math.floor((Math.random() * (UsersStore.users.length - 1)) / 2) + 1,
          content: getRandomString(75, 400),
          timestamp: generateRandomRecentDate().toISOString(),
        });
      });
    }

    let idx = 1;

    while (idx <= 7) {
      const userId = Math.floor((Math.random() * UsersStore.users.length) / 2) + UsersStore.users.length / 2;

      if (UsersQueueStore.dataObject.queue.find((queuedUser) => queuedUser.userId === userId)) continue;

      UsersQueueStore.update((data) => {
        data.queue.push({
          id: idx,
          timestamp: generateRandomRecentDate().toISOString(),
          userId,
        });
      });

      ++idx;
    }
  }, []);

  return (
    <StyledViewportContainer>
      <StyledPageTitle>Requests from clients</StyledPageTitle>
      <RequestsArea />
    </StyledViewportContainer>
  );
};
