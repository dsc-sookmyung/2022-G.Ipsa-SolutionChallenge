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
  audioUri: string;
  setAudioUri: React.Dispatch<React.SetStateAction<string>>;
  recordingCondition: RecordingCondition;
  setRecordingCondition: React.Dispatch<
    React.SetStateAction<RecordingCondition>
  >;
}

const AudioArea: FC<AudioAreaProps> = ({
  audioUri,
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
    const { name, fileCopyUri } = await DocumentPicker.pickSingle({
      type: types.audio,
      copyTo: 'cachesDirectory',
    });
    setAudioUri(fileCopyUri!);
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

  const handleCancel = async () => {
    await audioRecorderPlayer.stopPlayer();

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
    try {
      const result = await audioRecorderPlayer.startPlayer(audioUri);
      setRecordingCondition({
        beforeRecording: false,
        isRecording: false,
        isFinished: true,
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
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const handlePause = async () => {
    await audioRecorderPlayer.pausePlayer();
    setPlayingContition({ isPlaying: false, isPaused: true });
  };

  const getIconName = () => {
    if (playingContition.isPlaying) return 'pause';
    if (recordingCondition.beforeRecording) return 'microphone';
    if (recordingCondition.isRecording) return 'stop';
    if (recordingCondition.isFinished || playingContition.isPaused)
      return 'play';
  };

  const getButtonText = () => {
    if (playingContition.isPlaying) return 'Pause';
    if (recordingCondition.beforeRecording) return 'Record';
    if (recordingCondition.isRecording) return 'Stop';
    if (recordingCondition.isFinished || playingContition.isPaused)
      return 'Play';
  };

  const getPressFunction = () => {
    if (playingContition.isPlaying) return handlePause;
    if (recordingCondition.beforeRecording) return handleStartRecord;
    if (recordingCondition.isRecording) return handleStopRecord;
    if (recordingCondition.isFinished || playingContition.isPaused)
      return handlePlay;
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
