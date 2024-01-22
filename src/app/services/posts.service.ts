import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Post } from '../models/post.model';
import { BehaviorSubject, Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private baseUrl = 'https://localhost:7238/api/Blog/';
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

    return this.http.post(`${this.baseUrl}Post`, addPostRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error adding post:', error);

        if (error.error && error.error.errors) {
          // Accesso agli errori di convalida
          const validationErrors = error.error.errors;
          console.log('Validation errors:', validationErrors);
        }

        throw error; // Rilancia l'errore per poter essere gestito nell'handler del chiamante
      })
    );
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
}
