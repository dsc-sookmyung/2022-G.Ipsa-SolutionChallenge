import { View, Text } from 'react-native';
import React, { useState } from 'react';
import SelectArea from './SelectArea';
import { colors } from 'shared/utils/colors';
import { Category } from 'shared/types';
import AudioArea from './AudioArea';

export type RecordingCondition = {
  beforeRecording: boolean;
  isRecording: boolean;
  isFinished: boolean;
};

const RecordScreen = () => {
  const [title, setTitle] = useState<string>('');
  const [imageUri, setImageUri] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const [audioUri, setAudioUri] = useState<string>('');
  const [recordingCondition, setRecordingCondition] =
    useState<RecordingCondition>({
      beforeRecording: true,
      isRecording: false,
      isFinished: false,
    });

  return (
    <View style={{ height: '100%', backgroundColor: colors.background }}>
      <SelectArea
        title={title}
        setTitle={setTitle}
        imageUri={imageUri}
        audioUri={audioUri}
        setImageUri={setImageUri}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isFinished={recordingCondition.isFinished}
      />
      <AudioArea
        setAudioUri={setAudioUri}
        recordingCondition={recordingCondition}
        setRecordingCondition={setRecordingCondition}
      />
    </View>
  );
};

export default RecordScreen;
