import { Component, OnInit } from '@angular/core';
import { PostsService } from './services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isNavbarCollapsed = true;
  title: string = '';
  pageNumber: number = 1;

  constructor(private postsService: PostsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const pageParam = params.get('page');
      this.pageNumber = pageParam ? +pageParam : 1;
      console.log(pageParam)
    });
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  getPaginatedPosts(): void {
    const url = `posts/title/${this.title}/page/${this.pageNumber}`;
    this.router.navigate([url]);
  }
}
