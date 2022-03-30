import React, { FC, useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';

import S from './Styles';
import { MyText } from 'shared/components';
import { useLikedStories } from 'shared/hook/useLikedStories';
import { useCurrentUser } from 'src/provider/UserProvider';
import { useMusicPlayerShow } from 'src/provider/MusicPlayerProvider';
import { colors } from 'shared/utils/colors';
import { usePlayingBarShow } from 'src/provider/PlayingBarProvider';

const togglePlayback = async (playbackState: State) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack == null) {
    // TODO: Perhaps present an error or restart the playlist?
  } else {
    if (playbackState !== State.Playing) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

async function jumpForward() {
  console.log('Jump forward');
  const offset = 10;
  try {
    const position = await TrackPlayer.getPosition();
    const duration = await TrackPlayer.getDuration();

    console.log({ position, duration });

    if (duration - position > offset) {
      console.log('jumping in fact');
      await TrackPlayer.seekTo(position + offset);
    }
  } catch (err) {
    console.log(err);
  }
}

async function jumpBackward() {
  const offset = 15;
  console.log('Jump backward');
  try {
    const position = await TrackPlayer.getPosition();
    if (position - offset > 0) {
      await TrackPlayer.seekTo(position - offset);
    } else {
      await TrackPlayer.seekTo(0);
    }
  } catch (err) {
    console.log(err);
  }
}

const PlayingBar = () => {
  const { currentUser } = useCurrentUser();
  const { setIsMusicPlayerShow } = useMusicPlayerShow();
  const { isPlayingBarShow, setIsPlayingBarShow } = usePlayingBarShow();

  const { likedStories } = useLikedStories(currentUser?.id);

  const setupIfNecessary = async () => {
    // if app was relaunched and music was already playing, we don't setup again. -> SET UP AGAIN
    const currentTrack = await TrackPlayer.getCurrentTrack();
    console.log('currentTrack: ', currentTrack);
    if (currentTrack !== null) {
      setIsPlayingBarShow(true);
      return;
    }

    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: false,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        Capability.JumpBackward,
        Capability.JumpForward,
      ],
      forwardJumpInterval: 10,
      backwardJumpInterval: 15,
      compactCapabilities: [Capability.Play, Capability.Pause],
    });

    //await TrackPlayer.add(likedStories);
    for (let i = 0; i < likedStories.length; i++) {
      await TrackPlayer.add({
        id: likedStories[i].id,
        url: likedStories[i].audioFileSrc,
        title: likedStories[i].title,
        artist: '' + likedStories[i].creatorId,
        artwork: likedStories[i].thumbnailImageSrc,
        duration: likedStories[i].duration,
      });
    }

    TrackPlayer.setRepeatMode(RepeatMode.Queue);
  };

  const playbackState = usePlaybackState();

  const [trackArtwork, setTrackArtwork] = useState<string | number>();
  const [trackTitle, setTrackTitle] = useState<string>();
  const [trackArtist, setTrackArtist] = useState<string>();
  const [trackId, setTrackId] = useState<number>();

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (
      event.type === Event.PlaybackTrackChanged &&
      event.nextTrack !== undefined
    ) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const { id, title, artist, artwork } = track || {};
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
      setTrackId(id);
    }
  });

  // useEffect(() => {
  //   setupIfNecessary();
  // }, []);

  if (!isPlayingBarShow) return null;

  return (
    <SafeAreaView style={S.container}>
      {/* <Image style={S.artwork} source={{ uri: `${trackArtwork}` }} /> */}
      <TouchableOpacity
        onPress={() => setIsMusicPlayerShow(true)}
        style={S.clickArea}
      >
        <MyText fontSize={18} fontWeight="bold">
          {trackTitle}
        </MyText>
        <MyText fontSize={14} fontWeight="light">
          {trackArtist}
        </MyText>
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={() => togglePlayback(playbackState)}>
        <FontAwesome
          name={playbackState === State.Playing ? 'pause' : 'play'}
          size={20}
          color={colors.gray11}
          style={{ marginRight: 20 }}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => jumpForward()}>
        <Image
          style={S.secondaryActionButton}
          source={require('../../assets/images/front10s.png')}
        />
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default PlayingBar;
