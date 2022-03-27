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
  userpv: User | null;
  setUserpv: Dispatch<React.SetStateAction<User | null>>;
}>({
  userpv: null,
  setUserpv: () => {},
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userpv, setUserpv] = useState<User | null>(null);

  const value = useMemo(() => ({ userpv, setUserpv }), [userpv]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUserPv() {
  return useContext(UserContext);
}

export default UserProvider;
