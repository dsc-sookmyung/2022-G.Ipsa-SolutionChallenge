import React, {
  ReactNode,
  createContext,
  useMemo,
  useState,
  useContext,
} from 'react';

export const MusicPlayerContext = createContext<{
  isMusicPlayerShow: boolean;
  setIsMusicPlayerShow: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isMusicPlayerShow: false,
  setIsMusicPlayerShow: () => {},
});

const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [isMusicPlayerShow, setIsMusicPlayerShow] = useState<boolean>(false);

  const value = useMemo(
    () => ({ isMusicPlayerShow, setIsMusicPlayerShow }),
    [isMusicPlayerShow, setIsMusicPlayerShow]
  );

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export function useMusicPlayerShow() {
  return useContext(MusicPlayerContext);
}

export default MusicPlayerProvider;
