import { View, Text } from 'react-native';
import React, { useState } from 'react';
import SelectArea from './SelectArea';
import { colors } from 'shared/utils/colors';
import { Category } from 'shared/types';

const RecordScreen = () => {
  const [title, setTitle] = useState<string>('');
  const [imageUri, setImageUri] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();

  return (
    <View style={{ height: '100%', backgroundColor: colors.background }}>
      <SelectArea
        title={title}
        setTitle={setTitle}
        imageUri={imageUri}
        setImageUri={setImageUri}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </View>
  );
};

export default RecordScreen;
