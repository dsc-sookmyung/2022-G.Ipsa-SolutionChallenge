import React, { FC, useEffect, useState } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  LogBox,
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
import * as Progress from 'react-native-progress';

import S from './Styles';
import { MyText } from 'shared/components';
import { useLiked } from 'shared/hook/useLiked';
import { API_ENDPOINT } from 'shared/constants/env';
import { useCurrentUser } from 'src/provider/UserProvider';
import { useMusicPlayerShow } from 'src/provider/MusicPlayerProvider';
import { usePlayingStory } from 'src/provider/PlayingStoryProvider';
import api from 'shared/utils/api';
import { Story } from 'shared/types';
import { colors } from 'shared/utils/colors';

LogBox.ignoreLogs(['Warning: Possible Unhandled Promise Rejection']); // Ignore log notification by message

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

const MusicPlayerModal = () => {
  const { currentUser } = useCurrentUser();
  const { playingStory } = usePlayingStory();
  const { isMusicPlayerShow, setIsMusicPlayerShow } = useMusicPlayerShow();

  useEffect(() => {
    setupTrackPlayer();
  }, [playingStory]);

  const setupTrackPlayer = async () => {
    if (!playingStory) {
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

    await TrackPlayer.add({
      id: playingStory.id,
      url: playingStory.audioFileSrc,
      title: playingStory.title,
      artist: String(playingStory.nickname),
      artwork: playingStory.thumbnailImageSrc,
      duration: playingStory.duration,
    });

    const { data: likedStories } = await api.client.get<Story[]>(
      `/like/story?userId=${currentUser?.id}`
    );

    for (let i = 0; i < likedStories.length; i++) {
      await TrackPlayer.add({
        id: likedStories[i].id,
        url: likedStories[i].audioFileSrc,
        title: likedStories[i].title,
        artist: String(likedStories[i].nickname),
        artwork: likedStories[i].thumbnailImageSrc,
        duration: likedStories[i].duration,
      });
    }

    TrackPlayer.setRepeatMode(RepeatMode.Queue);

    await TrackPlayer.play();
  };

  const playbackState = usePlaybackState();
  const progress = useProgress();

  const [trackArtwork, setTrackArtwork] = useState<string | number | undefined>(
    playingStory?.thumbnailImageSrc
  );
  const [trackTitle, setTrackTitle] = useState<string>();
  const [trackArtist, setTrackArtist] = useState<string>();
  const [trackId, setTrackId] = useState<number>();
  const [isLiked, setIsLiked] = useState(false);

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

  const { likeData } = useLiked('?userId=' + currentUser?.id);

  useEffect(() => {
    setIsLiked(false);
    for (let i = 0; i < likeData?.length; i++) {
      if (trackId == likeData[i].likedStoryId) {
        setIsLiked(true);
      }
    }
  }, [trackId]);

  const like = {
    userId: currentUser?.id,
    likedStoryId: trackId,
  };

  const chaneLike = () => {
    let options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(like),
    };
    console.log(like);

    fetch(API_ENDPOINT + `/like/click`, options)
      .then((response) => {
        return response
          .text()
          .then((responseJson) => {
            const data = responseJson;
            console.log('data: \n' + data);
          })
          .catch((error) => {
            console.log('error: \n' + error);
          });
      })
      .catch((error) => {
        console.log('Fetch Error: \n', error);
      });

    console.log('data: ' + JSON.stringify(like));
    setIsLiked(!isLiked);
  };

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMusicPlayerShow}
        onRequestClose={() => {
          setIsMusicPlayerShow(false);
        }}
        style={{ flexDirection: 'column', alignItems: 'flex-end' }}
      >
        <View style={S.background}>
          <SafeAreaView style={S.screenContainer}>
            <MyText fontSize={24} fontWeight="bold">
              {trackTitle}
            </MyText>
            <View style={S.artistText}>
              <MyText fontSize={14} font="Suit">
                {trackArtist ? `made by ${trackArtist}` : ''}
              </MyText>
            </View>
            <Image style={S.artwork} source={{ uri: `${trackArtwork}` }} />

            <Slider
              style={S.progressContainer}
              value={progress.position}
              minimumValue={0}
              maximumValue={progress.duration}
              thumbTintColor={colors.primary}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor="#DDDDDD"
              onSlidingComplete={async (value) => {
                await TrackPlayer.seekTo(value);
              }}
            />
            <View style={S.progressLabelContainer}>
              <MyText fontSize={13} style={S.progressLabelText}>
                {new Date(progress.position * 1000).toISOString().substr(14, 5)}
              </MyText>
              <MyText fontSize={13} style={S.progressLabelText}>
                {new Date((progress.duration - progress.position) * 1000)
                  .toISOString()
                  .substr(14, 5)}
              </MyText>
            </View>

            <View style={S.actionRowContainer}>
              <TouchableWithoutFeedback
                onPress={() => TrackPlayer.skipToPrevious()}
              >
                <Image
                  style={S.thirdActionButton}
                  source={require('../../assets/images/rewind-button.png')}
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => jumpBackward()}>
                <Image
                  style={S.secondaryActionButton}
                  source={require('../../assets/images/back15s.png')}
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => togglePlayback(playbackState)}
              >
                {playbackState === State.Playing ? (
                  <Image
                    style={S.primaryActionButton}
                    source={require('../../assets/images/pause-button.png')}
                  />
                ) : (
                  <Image
                    style={S.primaryActionButton}
                    source={require('../../assets/images/play-button.png')}
                  />
                )}
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => jumpForward()}>
                <Image
                  style={S.secondaryActionButton}
                  source={require('../../assets/images/front10s.png')}
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => TrackPlayer.skipToNext()}
              >
                <Image
                  style={S.thirdActionButton}
                  source={require('../../assets/images/forward-button.png')}
                />
              </TouchableWithoutFeedback>
            </View>

            <View style={S.likecontainer}>
              <TouchableOpacity onPress={() => chaneLike()}>
                {isLiked ? (
                  <Image
                    style={S.heart}
                    source={require('../../assets/images/heart-fill.png')}
                  />
                ) : (
                  <Image
                    style={S.heart}
                    source={require('../../assets/images/heart-empty.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default MusicPlayerModal;
