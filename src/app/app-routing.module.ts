import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostViewComponent } from './post-view/post-view.component';

const routes: Routes = [
  {
    path:'',
    component: PostsListComponent
  },
  {
    path:'posts/page/:page',
    component: PostsListComponent
  },
  {
    path:'post/add',
    component: PostDetailComponent
  },
  { 
    path: 'post/:id', 
    component: PostDetailComponent
  },
  {
    path: 'post-view/:id',
    component: PostViewComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
