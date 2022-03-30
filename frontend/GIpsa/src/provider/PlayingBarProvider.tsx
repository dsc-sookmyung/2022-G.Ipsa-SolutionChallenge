import React, {
  ReactNode,
  Dispatch,
  createContext,
  useMemo,
  useState,
  useContext,
} from 'react';

export const PlayingBarContext = createContext<{
  isPlayingBarShow: boolean;
  setIsPlayingBarShow: Dispatch<React.SetStateAction<boolean>>;
}>({
  isPlayingBarShow: false,
  setIsPlayingBarShow: () => {},
});

const PlayingBarProvider = ({ children }: { children: ReactNode }) => {
  const [isPlayingBarShow, setIsPlayingBarShow] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      isPlayingBarShow,
      setIsPlayingBarShow,
    }),
    [isPlayingBarShow, setIsPlayingBarShow]
  );

  return (
    <PlayingBarContext.Provider value={value}>
      {children}
    </PlayingBarContext.Provider>
  );
};

export function usePlayingBarShow() {
  return useContext(PlayingBarContext);
}

export default PlayingBarProvider;
