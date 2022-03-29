import { View, Text } from 'react-native';
import React, { useState } from 'react';

import SelectArea from './SelectArea';
import AudioArea from './AudioArea';
import { Category } from 'shared/types';
import { colors } from 'shared/utils/colors';
import api from 'shared/utils/api';
import { API_ENDPOINT } from 'shared/constants/env';
import { useUserPv } from 'src/provider/UserProvider';
import { MainTabScreenProps } from 'navigator/types';

export type RecordingCondition = {
  beforeRecording: boolean;
  isRecording: boolean;
  isFinished: boolean;
};

const RecordScreen = ({ navigation }) => {
  const { userpv } = useUserPv();
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

  const uploadImage = async () => {
    try {
      const image = {
        uri: imageUri,
        type: 'image/jpeg',
        name: `image-${Date.now()}`,
      };
      const body = new FormData();
      body.append('image', image);

      const res = await fetch(`${API_ENDPOINT}/story/imageUpload`, {
        method: 'POST',
        body,
      });

      const { url } = await res.json();
      return url;
    } catch (error) {
      console.log('Image upload error: ', error);
    }
  };

  const uploadAudio = async () => {
    try {
      const audio = {
        uri: audioUri,
        type: 'audio/mp3',
        name: `audio-${Date.now()}`,
      };
      const body = new FormData();
      body.append('audio', audio);
      const res = await fetch(`${API_ENDPOINT}/story/audioUpload`, {
        method: 'POST',
        body,
      });

      const { url } = await res.json();
      return url;
    } catch (error) {
      console.log('Audio upload error: ', error);
    }
  };

  const handleDone = async () => {
    try {
      const uploadedImageUri = await uploadImage();
      const uploadedAudioUri = await uploadAudio();

      const payload = {
        creatorId: userpv?.id,
        title,
        thumbnailImageSrc: uploadedImageUri,
        category: selectedCategory?.title,
        audioFileSrc: uploadedAudioUri,
      };
      console.log(payload);
      await api.client.post('/story/create', payload);
      navigation.navigate('Home');
    } catch (error) {
      console.log('error: ', error);
    }
  };

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
        handleDone={handleDone}
      />
      <AudioArea
        audioUri={audioUri}
        setAudioUri={setAudioUri}
        recordingCondition={recordingCondition}
        setRecordingCondition={setRecordingCondition}
      />
    </View>
  );
};

export default RecordScreen;
