import { MyText } from 'shared/components';
import S from './Styles';
import React, { FC, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { Story, User } from 'shared/types';
import { useLiked } from 'shared/hook/useLiked';
import { API_ENDPOINT } from 'shared/constants/env';
import { useLikedStories } from 'shared/hook/useLikedStories';
import { useCurrentUser } from 'src/provider/UserProvider';
import { usePlayingBarShow } from 'src/provider/PlayingBarProvider';
import PlayerModal from '../PlayerModal';
import * as Progress from 'react-native-progress';
import { useMusicPlayerShow } from 'src/provider/MusicPlayerProvider';

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

const GlobalPlayer = () => {
  const { currentUser: userpv, setCurrentUser: setUserpv } = useCurrentUser();
  const {
    isMusicPlayerShow: mplayerShow,
    setIsMusicPlayerShow: setmPlayerShow,
  } = useMusicPlayerShow();

  // ���� ����Ʈ�� ���ϱ�(����Ʈ: ���ƿ� ���� ���丮��)
  const { likedStories } = useLikedStories(userpv?.id);

  const setupIfNecessary = async () => {
    // if app was relaunched and music was already playing, we don't setup again. -> SET UP AGAIN
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
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
  const progress = useProgress();

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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setupIfNecessary();
  }, []);

  useEffect(() => {
    setIsLoaded(false);
    if (trackId != null) {
      setIsLoaded(true);
    }
  }, [trackId]);

  return (
    <SafeAreaView style={S.container}>
      {mplayerShow && <PlayerModal stories={null} />}
      <SafeAreaView style={S.screenContainer}>
        {/* <Image style={S.artwork} source={{ uri: `${trackArtwork}` }} /> */}
        <TouchableOpacity onPress={() => setmPlayerShow(true)}>
          <View style={S.contentContainer}>
            <View style={S.titleText}>
              {isLoaded ? (
                <MyText fontSize={18} fontWeight="bold">
                  {trackTitle}
                </MyText>
              ) : (
                <Progress.Circle size={20} indeterminate={true} />
              )}
            </View>

            <View style={S.artistText}>
              <MyText fontSize={14} fontWeight="light">
                {trackArtist}
              </MyText>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={() => togglePlayback(playbackState)}>
          {playbackState === State.Playing ? (
            <Image
              style={S.primaryActionButton}
              source={require('../../assets/images/globalstop-btn.png')}
            />
          ) : (
            <Image
              style={S.primaryActionButton}
              source={require('../../assets/images/globalplay-btn.png')}
            />
          )}
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => jumpForward()}>
          <Image
            style={S.secondaryActionButton}
            source={require('../../assets/images/front10s.png')}
          />
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </SafeAreaView>
  );
};
export default GlobalPlayer;
