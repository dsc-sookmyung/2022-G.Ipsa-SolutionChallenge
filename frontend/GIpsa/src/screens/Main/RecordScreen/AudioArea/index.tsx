import React, { FC, useState } from 'react';
import { Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

import * as S from './Styles';
import { MyText } from 'shared/components';
import { colors } from 'shared/utils/colors';

export interface AudioAreaProps {
  setAudioUri: React.Dispatch<React.SetStateAction<string>>;
}

const AudioArea: FC<AudioAreaProps> = ({ setAudioUri }: AudioAreaProps) => {
  const [recordingTime, setRecordingTime] = useState('00:00');
  const [recordingCondition, setRecordingCondition] = useState<{
    beforeRecording: boolean;
    isRecording: boolean;
    isFinished: boolean;
  }>({ beforeRecording: true, isRecording: false, isFinished: false });
  const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(
    new AudioRecorderPlayer()
  );

  const trimTimeString = (time: string) => {
    return time.split(':').slice(0, 2).join(':');
  };

  const handleStartRecord = async () => {
    const uri = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordingTime(
        trimTimeString(
          audioRecorderPlayer.mmssss(Math.floor(e.currentPosition))
        )
      );
    });

    setAudioUri(uri);
    setRecordingCondition({
      beforeRecording: false,
      isRecording: true,
      isFinished: false,
    });
  };

  const handleStopRecord = async () => {
    await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();

    setRecordingCondition({
      beforeRecording: false,
      isRecording: false,
      isFinished: true,
    });
  };

  const handleCancel = () => {
    setRecordingCondition({
      beforeRecording: true,
      isRecording: false,
      isFinished: false,
    });
    setAudioRecorderPlayer(new AudioRecorderPlayer());
    setRecordingTime('00:00');
  };

  const handlePlay = () => {};

  return (
    <S.Root>
      <MyText fontSize={14} color={colors.gray7}>
        {recordingCondition.beforeRecording ? '' : recordingTime}
      </MyText>
      <S.Buttons>
        <S.LeftSide>
          {recordingCondition.isFinished && (
            <S.Wrapper>
              <S.SideButton activeOpacity={0.8} onPress={handleCancel}>
                <FontAwesome name={'close'} size={30} color={colors.primary} />
              </S.SideButton>
              <MyText fontSize={14}>Cancel</MyText>
            </S.Wrapper>
          )}
        </S.LeftSide>

        <S.Wrapper>
          <S.CenterButton
            activeOpacity={0.8}
            onPress={
              recordingCondition.isRecording
                ? handleStopRecord
                : recordingCondition.isFinished
                ? handlePlay
                : handleStartRecord
            }
          >
            <FontAwesome
              name={
                recordingCondition.isRecording
                  ? 'stop'
                  : recordingCondition.isFinished
                  ? 'play'
                  : 'microphone'
              }
              size={recordingCondition.isRecording ? 30 : 40}
              color={colors.gray1}
            />
          </S.CenterButton>
          <MyText fontSize={14}>
            {recordingCondition.isRecording
              ? 'Stop'
              : recordingCondition.isFinished
              ? 'Play'
              : 'Record'}
          </MyText>
        </S.Wrapper>

        <S.RightSide>
          {recordingCondition.beforeRecording && (
            <S.Wrapper>
              <S.SideButton activeOpacity={0.8}>
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
