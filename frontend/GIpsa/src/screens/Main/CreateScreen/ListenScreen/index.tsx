import { MyText } from 'shared/components';
import S from './Styles';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
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
import { Story } from 'shared/types';

const setupIfNecessary = async () => {
  // if app was relaunched and music was already playing, we don't setup again.
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
    compactCapabilities: [Capability.Play, Capability.Pause],
  });

  // 파일 리스트로 더하기
  // await TrackPlayer.add(playlistData);

  // 링크로 더하기
  const stories: Story[] = [
    {
      id: 6,
      creatorId: 53,
      title: 'shumdang',
      thumbnailImageSrc:
        'https://storage.googleapis.com/gipsa-upload/storySrc/shumdang.jpg',
      category: 'animation',
      audioFileSrc:
        'https://storage.googleapis.com/gipsa-upload/storySrc/%EC%95%84%EC%9D%B4%EC%9C%A0-02-Zeze-CHAT-SHIRE-320.mp3',
      likes: 0,
      createdAt: new Date('2022-03-22T17:51:13.931Z'),
      duration: 190,
    },
    {
      id: 7,
      creatorId: 54,
      title: 'ddangddang',
      thumbnailImageSrc:
        'https://storage.googleapis.com/gipsa-upload/storySrc/ddangddang.jpg',
      category: 'animation',
      audioFileSrc:
        'https://storage.googleapis.com/gipsa-upload/storySrc/%EC%95%84%EC%9D%B4%EC%9C%A0-05-Red%20Queen%20(Feat.%20Zion.T)-CHAT-SHIRE-320.mp3',
      likes: 0,
      createdAt: new Date('2022-03-22T17:52:44.587Z'),
      duration: 216,
    },
  ];

  for (let i = 0; i < stories.length; i++) {
    await TrackPlayer.add({
      url: stories[i].audioFileSrc,
      title: stories[i].title,
      artist: '' + stories[i].creatorId,
      artwork: stories[i].thumbnailImageSrc,
      duration: stories[i].duration,
    });
  }

  TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

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

const ListenScreen = ({ navigation }) => {
  // moment(story.createdAt).format('YYYY.MM.DD');

  const playbackState = usePlaybackState();
  const progress = useProgress();

  const [trackArtwork, setTrackArtwork] = useState<string | number>();
  const [trackTitle, setTrackTitle] = useState<string>();
  const [trackArtist, setTrackArtist] = useState<string>();

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (
      event.type === Event.PlaybackTrackChanged &&
      event.nextTrack !== undefined
    ) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const { title, artist, artwork } = track || {};
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
    }
  });

  useEffect(() => {
    setupIfNecessary();
  }, []);

  return (
    <SafeAreaView style={S.screenContainer}>
      <StatusBar barStyle={'light-content'} />
      <View style={S.contentContainer}>
        <View style={S.titleText}>
          <MyText fontSize={18} fontWeight="bold">
            {trackTitle}
          </MyText>
        </View>
        <View style={S.artistText}>
          <MyText fontSize={14} fontWeight="light">
            {trackArtist}
          </MyText>
        </View>
        <Image style={S.artwork} source={{ uri: `${trackArtwork}` }} />
        <Slider
          style={S.progressContainer}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          thumbTintColor="#F98B65"
          minimumTrackTintColor="#F98B65"
          maximumTrackTintColor="#DDDDDD"
          onSlidingComplete={async (value) => {
            await TrackPlayer.seekTo(value);
          }}
        />
        <View style={S.progressLabelContainer}>
          <Text style={S.progressLabelText}>
            {new Date(progress.position * 1000).toISOString().substr(14, 5)}
          </Text>
          <Text style={S.progressLabelText}>
            {new Date((progress.duration - progress.position) * 1000)
              .toISOString()
              .substr(14, 5)}
          </Text>
        </View>
      </View>
      <View style={S.actionRowContainer}>
        <TouchableWithoutFeedback onPress={() => TrackPlayer.skipToPrevious()}>
          <Text style={S.secondaryActionButton}>Prev</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => togglePlayback(playbackState)}>
          <Text style={S.primaryActionButton}>
            {playbackState === State.Playing ? 'Pause' : 'Play'}
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => TrackPlayer.skipToNext()}>
          <Text style={S.secondaryActionButton}>Next</Text>
        </TouchableWithoutFeedback>
      </View>
      <Button
        title="Remove audios"
        onPress={() => {
          TrackPlayer.reset();
          setTrackArtist('');
          setTrackArtwork('');
          setTrackTitle('');
        }}
      />
    </SafeAreaView>
  );
};
export default ListenScreen;
