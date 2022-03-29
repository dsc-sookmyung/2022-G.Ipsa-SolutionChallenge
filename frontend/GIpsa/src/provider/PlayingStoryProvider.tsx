import React, {
  ReactNode,
  Dispatch,
  createContext,
  useMemo,
  useState,
  useContext,
} from 'react';
import { Story } from 'shared/types';

export const PlayingStoryContext = createContext<{
  playingStory: Story | undefined;
  setPlayingStory: Dispatch<React.SetStateAction<Story | undefined>>;
}>({
  playingStory: undefined,
  setPlayingStory: () => {},
});

const PlayingStoryProvider = ({ children }: { children: ReactNode }) => {
  const [playingStory, setPlayingStory] = useState<Story | undefined>();

  const value = useMemo(
    () => ({
      playingStory,
      setPlayingStory,
    }),
    [playingStory, setPlayingStory]
  );

  return (
    <PlayingStoryContext.Provider value={value}>
      {children}
    </PlayingStoryContext.Provider>
  );
};

export function usePlayingStory() {
  return useContext(PlayingStoryContext);
}

export default PlayingStoryProvider;
