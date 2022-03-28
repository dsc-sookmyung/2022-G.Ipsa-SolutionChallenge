import React, {
  ReactNode,
  Dispatch,
  createContext,
  useMemo,
  useState,
  useContext,
} from 'react';

export const GlobalPlayerContext = createContext<{
  playerShow: boolean;
  setPlayerShow: Dispatch<React.SetStateAction<boolean>>;
}>({
  playerShow: false,
  setPlayerShow: () => {},
});

const GlobalPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [playerShow, setPlayerShow] = useState<boolean>(false);

  const value = useMemo(() => ({ playerShow, setPlayerShow }), [playerShow]);

  return (
    <GlobalPlayerContext.Provider value={value}>
      {children}
    </GlobalPlayerContext.Provider>
  );
};

export function useGlobalPlayerPv() {
  return useContext(GlobalPlayerContext);
}

export default GlobalPlayerProvider;
