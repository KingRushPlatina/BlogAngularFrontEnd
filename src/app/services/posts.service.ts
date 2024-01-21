
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private baseUrl = 'https://localhost:7238/api/Blog/';

  constructor(private http: HttpClient) {}

  getPaginatedPosts(pageNumber: number, pageSize: number): Observable<Post[]> {
    const params = new HttpParams().set('pageNumber', pageNumber.toString()).set('pageSize', pageSize.toString());

    return this.http.get<Post[]>(`${this.baseUrl}Posts`, { params });
  }

  
  addPost(addPostRequest: Post): Observable<any> {
    return this.http.post(`${this.baseUrl}Post`, 6);
  }
  getPostDetails(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}Post/${postId}`);
  }
}