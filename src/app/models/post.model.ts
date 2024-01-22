import { Autor } from './author.model';
import { Comment } from './comment.model';

export interface Post {
  id: number;
  title: string;
  body: string;
  publishDate: string | null;
  autor: Autor | null;
  comments: Comment[] | null;
}
