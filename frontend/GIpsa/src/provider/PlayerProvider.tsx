import React, {
  ReactNode,
  Dispatch,
  createContext,
  useMemo,
  useState,
  useContext,
} from 'react';

export const PlayerContext = createContext<{
  mplayerShow: boolean;
  setmPlayerShow: Dispatch<React.SetStateAction<boolean>>;
}>({
  mplayerShow: false,
  setmPlayerShow: () => {},
});

const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [mplayerShow, setmPlayerShow] = useState<boolean>(false);

  const value = useMemo(() => ({ mplayerShow, setmPlayerShow }), [mplayerShow]);

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export function usePlayerPv() {
  return useContext(PlayerContext);
}

export default PlayerProvider;
