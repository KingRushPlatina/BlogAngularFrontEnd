import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostViewComponent } from './post-view/post-view.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts/title/%20/page/1',
    pathMatch: 'full',
  },
  {
 
    path: 'posts/page/:page',
    redirectTo: 'posts/title/%20/page/1', 
    pathMatch: 'full',
  },
  {
 
    path:'posts/title//page/1', 
    redirectTo: 'posts/title/%20/page/1', 
    pathMatch: 'full',
  },
  {
    path: 'post/add',
    component: PostDetailComponent,
  },
  {
    path: 'post/:id',
    component: PostDetailComponent,
  },
  {
    path: 'post-view/:id',
    component: PostViewComponent,
  },
  { path: 'posts/title/:title/page/:page', 
   component: PostsListComponent 
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
