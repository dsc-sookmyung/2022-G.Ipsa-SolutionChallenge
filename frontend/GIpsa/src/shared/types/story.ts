export interface Story {
  id: number;
  creatorId: number;
  likes: number;
  title: string;
  category: string;
  thumbnailImageSrc: string;
  audioFileSrc: string;
  createdAt: Date;
  duration?: number;
  likedStoryId?: number;
  userId?: number;
}
