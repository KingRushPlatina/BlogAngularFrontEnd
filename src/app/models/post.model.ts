import { Autor } from "./author.model";
import {Comment} from "./comment.model";

export interface Post {
  id: number;
  title: string;
  body: string;
  publishDate: Date;
  autor: Autor | null;
  comments: Comment[] | null;
}
