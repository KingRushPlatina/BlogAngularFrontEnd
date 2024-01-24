// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { FormsModule } from '@angular/forms';
import { PostViewComponent } from './post-view/post-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    PostsListComponent,
    PostDetailComponent,
    PostViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastModule,
    ButtonModule
  ],
  providers: [
    { provide: 'API_URL', useValue: environment.apiUrl },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
