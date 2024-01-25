import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} 
from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Post } from '../models/post.model';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  addPoste(formData: FormData) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:5108/api/Blog/';
  private successMessageSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  constructor(private http: HttpClient) {}
  getPaginatedPosts(
    title: string,
    pageNumber: number,
    pageSize: number
  ): Observable<Post[]> {
    const params = new HttpParams()
      .set('title', title.toString())
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<Post[]>(`${this.baseUrl}Posts`, { params });
  }
  addPost(addPostRequest: Post): Observable<any> {
    console.log(addPostRequest);
    return this.http.post(`${this.baseUrl}Post`, addPostRequest);
  }
  getPostDetails(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}Post/${postId}`);
  }
  setSuccessMessage(message: string): void {
    this.successMessageSubject.next(message);
  }
  getSuccessMessage(): Observable<string> {
    return this.successMessageSubject.asObservable();
  }
  addPoster(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}Post`, formData);
  }
  addUpload(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}Upload`, formData);
  }
  upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.baseUrl}Upload`, formData);
  }
  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}Upload`, formData).pipe(
      catchError((error) => {
        console.error('Upload error:', error);
        return of(null);
      })
    );
  }
}
