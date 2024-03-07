import { useContext } from 'react';
import { UserContext } from '../contexts/user-context';

export function useUser() {
  const value = useContext(UserContext);

  if (!value) {
    throw new Error('Used UserContext outside of UserProvider.');
  }

  return value;
}
