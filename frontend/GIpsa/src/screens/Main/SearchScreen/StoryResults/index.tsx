import React, { FC } from 'react';

import * as S from './Styles';
import { Story, User } from 'shared/types';
import { MyText, StoryCardHorizontal } from 'shared/components';

export interface StoryReseltsProps {
  stories: Story[] | undefined;
}

const StoryReselts: FC<StoryReseltsProps> = ({
  stories,
}: StoryReseltsProps) => {
  return (
    <S.Root>
      <MyText fontSize={24} fontWeight="bold">
        Story
      </MyText>
      <S.StoryContainer>
        {stories?.map((story) => (
          <StoryCardHorizontal key={story.id} story={story} />
        ))}
      </S.StoryContainer>
    </S.Root>
  );
};

export default React.memo(StoryReselts);
