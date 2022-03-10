export interface User {
  id?: number;
  email: string;
  birth: Date;
  showBirth: boolean;
  isCreator: boolean;
  nickname: string;
  profileImageSrc: string;
}
