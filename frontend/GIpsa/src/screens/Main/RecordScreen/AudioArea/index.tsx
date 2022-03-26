import React, { FC, useState } from 'react';
import { Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import DocumentPicker, { types } from 'react-native-document-picker';

import * as S from './Styles';
import { MyText } from 'shared/components';
import { colors } from 'shared/utils/colors';
import { RecordingCondition } from '..';

export interface AudioAreaProps {
  setAudioUri: React.Dispatch<React.SetStateAction<string>>;
  recordingCondition: RecordingCondition;
  setRecordingCondition: React.Dispatch<
    React.SetStateAction<RecordingCondition>
  >;
}

const AudioArea: FC<AudioAreaProps> = ({
  setAudioUri,
  recordingCondition,
  setRecordingCondition,
}: AudioAreaProps) => {
  const [recordingTime, setRecordingTime] = useState('00:00');

  const [playingContition, setPlayingContition] = useState<{
    isPlaying: boolean;
    isPaused: boolean;
  }>({ isPlaying: false, isPaused: false });
  const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(
    new AudioRecorderPlayer()
  );

  const trimTimeString = (time: string) => {
    return time.split(':').slice(0, 2).join(':');
  };

  const handleUpload = async () => {
    const { uri, name } = await DocumentPicker.pickSingle({
      type: types.audio,
    });
    setAudioUri(uri);
    setRecordingCondition({
      beforeRecording: false,
      isRecording: false,
      isFinished: true,
    });
    setRecordingTime(name);
  };

  const handleStartRecord = async () => {
    const uri = await audioRecorderPlayer.startRecorder();
    setAudioUri(uri);
    setRecordingCondition({
      beforeRecording: false,
      isRecording: true,
      isFinished: false,
    });
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordingTime(
        trimTimeString(
          audioRecorderPlayer.mmssss(Math.floor(e.currentPosition))
        )
      );
    });
  };

  const handleStopRecord = async () => {
    await audioRecorderPlayer.stopRecorder();
    setRecordingCondition({
      beforeRecording: false,
      isRecording: false,
      isFinished: true,
    });
    audioRecorderPlayer.removeRecordBackListener();
  };

  const handleCancel = () => {
    setRecordingCondition({
      beforeRecording: true,
      isRecording: false,
      isFinished: false,
    });
    setPlayingContition({ isPlaying: false, isPaused: false });
    setAudioRecorderPlayer(new AudioRecorderPlayer());
    setRecordingTime('00:00');
  };

  const handlePlay = async () => {
    await audioRecorderPlayer.startPlayer();
    setRecordingCondition({
      beforeRecording: false,
      isRecording: false,
      isFinished: false,
    });
    setPlayingContition({ isPlaying: true, isPaused: false });
    audioRecorderPlayer.addPlayBackListener((e) => {
      setRecordingTime(
        trimTimeString(
          audioRecorderPlayer.mmssss(Math.floor(e.currentPosition))
        )
      );
      if (e.currentPosition === e.duration) {
        setRecordingTime('00:00');
        setPlayingContition({ isPlaying: false, isPaused: false });
        setRecordingCondition({
          beforeRecording: false,
          isRecording: false,
          isFinished: true,
        });
      }
    });
  };

  const handlePause = async () => {
    await audioRecorderPlayer.pausePlayer();
    setPlayingContition({ isPlaying: false, isPaused: true });
  };

  const getIconName = () => {
    if (recordingCondition.beforeRecording) return 'microphone';
    if (recordingCondition.isRecording) return 'stop';
    if (recordingCondition.isFinished || playingContition.isPaused)
      return 'play';

    if (playingContition.isPlaying) return 'pause';
  };

  const getButtonText = () => {
    if (recordingCondition.beforeRecording) return 'Record';
    if (recordingCondition.isRecording) return 'Stop';
    if (recordingCondition.isFinished || playingContition.isPaused)
      return 'Play';

    if (playingContition.isPlaying) return 'Pause';
  };

  const getPressFunction = () => {
    if (recordingCondition.beforeRecording) return handleStartRecord;
    if (recordingCondition.isRecording) return handleStopRecord;
    if (recordingCondition.isFinished || playingContition.isPaused)
      return handlePlay;

    if (playingContition.isPlaying) return handlePause;
  };

  return (
    <S.Root>
      <MyText fontSize={14} color={colors.gray7}>
        {recordingCondition.beforeRecording ? '' : recordingTime}
      </MyText>
      <S.Buttons>
        <S.LeftSide>
          {(recordingCondition.isFinished ||
            playingContition.isPlaying ||
            playingContition.isPaused) && (
            <S.Wrapper>
              <S.SideButton activeOpacity={0.8} onPress={handleCancel}>
                <FontAwesome name={'close'} size={30} color={colors.primary} />
              </S.SideButton>
              <MyText fontSize={14}>Cancel</MyText>
            </S.Wrapper>
          )}
        </S.LeftSide>

        <S.Wrapper>
          <S.CenterButton activeOpacity={0.8} onPress={getPressFunction()}>
            <FontAwesome
              name={getIconName()!}
              size={recordingCondition.isRecording ? 30 : 40}
              color={colors.gray1}
            />
          </S.CenterButton>
          <MyText fontSize={14}>{getButtonText()}</MyText>
        </S.Wrapper>

        <S.RightSide>
          {recordingCondition.beforeRecording && (
            <S.Wrapper>
              <S.SideButton activeOpacity={0.8} onPress={handleUpload}>
                <FontAwesome name={'upload'} size={30} color={colors.primary} />
              </S.SideButton>
              <MyText fontSize={14}>Upload</MyText>
            </S.Wrapper>
          )}
        </S.RightSide>
      </S.Buttons>
    </S.Root>
  );
};

export default AudioArea;
