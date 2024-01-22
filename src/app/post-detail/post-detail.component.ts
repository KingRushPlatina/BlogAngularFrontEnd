// post-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {

   addPostRequest: Post = {
    id: 0,
    title: "",
    body: "",
    publishDate: new Date().toISOString(),
    autor: {
      id: 1,
      name: "Nome dell'autore",
      surname: "Cognome dell'autore",
      mail: "mail@example.com"
    },
    comments: [
      {
        id: 1,
        text: "Testo del commento",
        creationDate: new Date().toISOString()
      }
    ]
  };
  route: any;
  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit(): void {}

  addPost(): void {
    this.postsService.addPost(this.addPostRequest).subscribe(
      (response) => {
        console.log('Post added successfully:', response);
        this.postsService.setSuccessMessage('Post aggiunto con successo!');
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Error adding post:', error);
      }
    );
  }
  goBack(): void {
    this.router.navigate(['']);
  }
}
