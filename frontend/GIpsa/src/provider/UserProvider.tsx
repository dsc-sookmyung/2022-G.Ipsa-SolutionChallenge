import React, {
  ReactNode,
  Dispatch,
  createContext,
  useMemo,
  useState,
  useContext,
} from 'react';
import { User } from 'shared/types';

export const UserContext = createContext<{
  currentUser: User | undefined;
  setCurrentUser: Dispatch<React.SetStateAction<User | undefined>>;
}>({
  currentUser: undefined,
  setCurrentUser: () => {},
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const value = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useCurrentUser() {
  return useContext(UserContext);
}

export default UserProvider;
