import React, {
  ReactNode,
  Dispatch,
  createContext,
  useMemo,
  useState,
  useContext,
} from 'react';
import { User } from 'shared/types';

// use only for wrapping profile because of GlobalPlayer

export const ProfileContext = createContext<{
  profilepv: User | null;
  setProfilepv: Dispatch<React.SetStateAction<User | null>>;
}>({
  profilepv: null,
  setProfilepv: () => {},
});

const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profilepv, setProfilepv] = useState<User | null>(null);

  const value = useMemo(() => ({ profilepv, setProfilepv }), [profilepv]);

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export function useProfilePv() {
  return useContext(ProfileContext);
}

export default ProfileProvider;
