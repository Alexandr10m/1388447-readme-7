import {Category} from "./category.interface";

export interface Post {
  id?: string;
  title: string;
  categories: Category[];
  description: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  userid: string;
  comments: Comment[];
}
