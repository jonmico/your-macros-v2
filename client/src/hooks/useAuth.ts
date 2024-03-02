import { useContext } from 'react';
import { AuthContext } from '../contexts/auth-context';

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('AuthContext used outside of AuthProvider.');
  }

  return value;
}
