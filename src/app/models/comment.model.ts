import { Autor } from '../models/author.model';

export interface Comment {
  id: number;
  text: string;
  creationDate: string;
  commentator: Autor;
}
