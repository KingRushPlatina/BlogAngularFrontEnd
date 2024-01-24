import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
  providers: [MessageService]
})
export class PostsListComponent implements OnInit {
  hasNextPage: boolean = false;
  posts: Post[] = [];
  pageNumber: number = 1;
  title: string = '';
  successMessage: string = ''; 

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pageNumber = +params['page'] || 1;
      this.title = params['title'] || '';
      this.loadPosts();
    });

    this.postsService.getSuccessMessage().subscribe((message) => 
    {
      this.successMessage = message;
        if(this.successMessage == "Post aggiunto con successo!")
        this.messageService.add({severity: 'success', summary:  message, detail: 'Post Aggiunto' });
        

    }).unsubscribe();
  }

  loadPosts(): void {
    this.postsService
      .getPaginatedPosts(this.title, this.pageNumber, 4)
      .subscribe({
        next: (response) => {
          this.posts = response;
          this.hasNextPage = response.length === 4;
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
    const url = `posts/title/${this.title}/page/${this.pageNumber}`;
    this.router.navigate([url]);  
    this.loadPosts();
  }
  

  goToPostDetail(postId: number): void {
    this.router.navigate(['/post-view', postId]);
  }
  showToast() { 
    this.messageService.add({severity: 'success', summary:  'Heading', detail: 'More details....' });
  }
  
}
