// posts-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  hasNextPage: boolean = false;
  posts: Post[] = [];
  pageNumber: number = 1;

  constructor(private postsService: PostsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pageNumber = +params['page'] || 1;
      this.loadPosts();
    });
  }

  loadPosts(): void {
    this.postsService.getPaginatedPosts(this.pageNumber, 4).subscribe({
      next: (response) => {
        this.posts = response;
        this.hasNextPage = response.length === 4; // Se la lunghezza della lista è uguale alla dimensione della pagina, ci sono più post disponibili

      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  goToNextPage(): void {
    this.pageNumber++;
    this.updateUrlAndLoadPosts();
  }

  goToPreviousPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.updateUrlAndLoadPosts();
    }
  }

  updateUrlAndLoadPosts(): void {
    this.router.navigate(['posts', 'page', this.pageNumber]);
    this.loadPosts();
  }

  
  goToPostDetail(postId: number): void {
    this.router.navigate(['/post-view', postId]);
  }

}
