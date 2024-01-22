import { Component } from '@angular/core';
import { PostsService } from './services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isNavbarCollapsed = true;

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
  route: any;
  constructor(private postsService: PostsService, private router: Router) 
  {
    
  }

  addPost(): void {

    
  }
}