export interface LikeStory {
  story_id: number;
  story_creatorId: number;
  story_likes: number;
  story_title: string;
  story_category: string;
  story_thumbnailImageSrc: string;
  story_audioFileSrc: string;
  story_createdAt: Date;
  duration?: number;
  likedStoryId?: number;
  userId?: number;
}
