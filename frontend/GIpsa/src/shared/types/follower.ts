export interface Follower {
  followerId: number;
  id?: number;
  email: string;
  birth: Date;
  showBirth: boolean;
  isCreator: boolean;
  nickname: string;
  profileImageSrc: string;
}
