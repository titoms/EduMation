import { createContext, useContext } from 'react';
import { User } from '../useContext';

export const DashboardContext = createContext<User | undefined>(undefined);

export function useUserContext() {
  const users = useContext(DashboardContext);

  if (users === undefined) {
    throw new Error('UseUserContext mush be used with a DashboardContext');
  }
  return users;
}
