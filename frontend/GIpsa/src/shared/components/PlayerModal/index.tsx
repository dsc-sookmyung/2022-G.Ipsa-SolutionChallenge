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
import { useUserPv } from 'src/provider/UserProvider';

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

export interface PlayerModalProps {
  stories?: Story[];
}

const PlayerModal: FC<PlayerModalProps> = ({ stories }: PlayerModalProps) => {
  const { userpv, setUserpv } = useUserPv();

  // 파일 리스트로 더하기(디폴트: 좋아요 누른 스토리들)
  const { likedStories } = useLikedStories(userpv.id);

  const setupIfNecessary = async () => {
    // if app was relaunched and music was already playing, we don't setup again. -> SET UP AGAIN
    // const currentTrack = await TrackPlayer.getCurrentTrack();
    // if (currentTrack !== null) {
    //   return;
    // }

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

    for (let i = 0; i < stories.length; i++) {
      await TrackPlayer.add({
        id: stories[i].id,
        url: stories[i].audioFileSrc,
        title: stories[i].title,
        artist: '' + stories[i].creatorId,
        artwork: stories[i].thumbnailImageSrc,
        duration: stories[i].duration,
      });
    }

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

  const [modalVisible, setModalVisible] = useState(true);
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const [trackArtwork, setTrackArtwork] = useState<string | number>();
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

  useEffect(() => {
    setupIfNecessary();
  }, []);

  // 좋아요 받아와서 색 지정
  const { likeData, loading } = useLiked('?userId=' + userpv.id);

  // console.log('' + userpv.id + 'likeData: ' + JSON.stringify(likeData));

  useEffect(() => {
    setIsLiked(false);
    for (let i = 0; i < likeData.length; i++) {
      if (trackId == likeData[i].likedStoryId) {
        setIsLiked(true);
      }
    }
  }, [trackId]);

  // 좋아요 변경
  const like = {
    userId: userpv.id,
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
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
        style={{ flexDirection: 'column', alignItems: 'flex-end' }}
      >
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
            <TouchableWithoutFeedback onPress={() => TrackPlayer.skipToNext()}>
              <Image
                style={S.thirdActionButton}
                source={require('../../assets/images/forward-button.png')}
              />
            </TouchableWithoutFeedback>
          </View>
          {/* <Button
            title="Remove audios"
            onPress={() => {
              TrackPlayer.reset();
              setTrackArtist('');
              setTrackArtwork('');
              setTrackTitle('');
            }}
          /> */}
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

        <Pressable
          style={[S.button, S.buttonClose]}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={S.textStyle}>Hide Modal</Text>
        </Pressable>
      </Modal>
    </View>
  );
};
export default PlayerModal;
