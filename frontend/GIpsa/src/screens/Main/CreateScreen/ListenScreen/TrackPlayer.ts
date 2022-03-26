import TrackPlayer from 'react-native-track-player';
import { Story } from 'shared/types';

const start = (story: Story) => {
  TrackPlayer.setupPlayer();
  TrackPlayer.add({
    id: story.id,
    url: story.audioFileSrc,
    title: story.title,
    artist: '' + story.creatorId,
    artwork: story.thumbnailImageSrc,
  });
  TrackPlayer.play();
};
export default start;
