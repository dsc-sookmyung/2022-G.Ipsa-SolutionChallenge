import { ScrollView, Text } from 'react-native';
import React from 'react';

import S from './Styles';
import { MainTabScreenProps } from 'navigator/types';
import { StoryTopic } from 'shared/components';

export type HomeScreenParams = {
  a: number;
};

const HomeScreen = ({ navigation, route }: MainTabScreenProps<'Home'>) => {
  const stories = [
    {
      id: 1,
      creatorId: 1,
      title: 'test1',
      category: 'test category',
      likes: 0,
    },
    {
      id: 2,
      creatorId: 1,
      title: 'test2',
      category: 'test category',
      likes: 0,
    },
    {
      id: 3,
      creatorId: 1,
      title: 'test3',
      category: 'test category',
      likes: 0,
    },
    {
      id: 4,
      creatorId: 1,
      title: 'test4',
      category: 'test category',
      likes: 0,
    },
    {
      id: 5,
      creatorId: 1,
      title: 'test5',
      category: 'test category',
      likes: 0,
    },
    {
      id: 6,
      creatorId: 1,
      title: 'test6',
      category: 'test category',
      likes: 0,
    },
    {
      id: 7,
      creatorId: 1,
      title: 'test7',
      category: 'test category',
      likes: 0,
    },
    {
      id: 8,
      creatorId: 1,
      title: 'test8',
      category: 'test category',
      likes: 0,
    },
  ];

  return (
    <ScrollView style={S.container}>
      <Text style={S.title}>HomeScreen</Text>
      <StoryTopic title="인기 스토리" stories={stories} />
    </ScrollView>
  );
};

export default HomeScreen;
