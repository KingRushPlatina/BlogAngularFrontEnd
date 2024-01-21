import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css'],
})
export class PostViewComponent implements OnInit {
  postId: number =0;
  post: Post | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = +params['id'];
      this.getPostDetails();
    });
  }

  getPostDetails() {
    this.postsService.getPostDetails(this.postId).subscribe(
      (data: Post) => {
        console.log(data)
        this.post = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
