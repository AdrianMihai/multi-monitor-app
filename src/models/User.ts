import FirstNames from '../../assets/data/first-names.json';
import LastNames from '../../assets/data/last-names.json';
import { capitalizeString } from '../utils/StringUtils';

export const AllFirstNames = JSON.parse(FirstNames as unknown as string);
export const AllLastNames = JSON.parse(LastNames as unknown as string);

export interface User {
  id: number;
  username: string;
}

export const generateRandomUserName = () => {
  const firstName = AllFirstNames[Math.floor(Math.random() * (AllFirstNames.length - 1))];
  const lastName = AllLastNames[Math.floor(Math.random() * (AllLastNames.length - 1))];

  return `${capitalizeString(firstName)} ${capitalizeString(lastName)}`;
};
