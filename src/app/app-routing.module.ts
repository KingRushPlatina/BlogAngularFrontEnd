import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostViewComponent } from './post-view/post-view.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts/page/1', // Aggiungi questa riga per il redirect
    pathMatch: 'full',
  },
  {
    path: 'posts/page/:page',
    component: PostsListComponent,
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
  {
    path: 'posts/title/:title/page/:page',
    component: PostsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
