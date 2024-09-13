export interface Comment {
  id?: string;
  createdAt: Date;
  updatedAt: Date;
  postId?: string;
  message: string;
  userid: string;
}
