// post-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {

  addPostRequest: Post = {
    id: 0,
    title: '',
    body: '',
    publishDate: new Date(),
    autor: null,
    comments: null
  };

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {}

  addPost(): void {
    this.postsService.addPost(this.addPostRequest).subscribe(
      (response) => {
        console.log('Post added successfully:', response);
        // Puoi eseguire altre azioni dopo aver aggiunto il post
      },
      (error) => {
        console.error('Error adding post:', error);
        // Gestisci gli errori qui
      }
    );
  }
}
