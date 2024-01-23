// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { FormsModule } from '@angular/forms';
import { PostViewComponent } from './post-view/post-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UploadFormComponent } from './upload-test/upload-test.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsListComponent,
    PostDetailComponent,
    PostViewComponent,
    UploadFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, // Aggiungi ReactiveFormsModule agli imports
    NgbModule,
  ],
  providers: [
    { provide: 'API_URL', useValue: environment.apiUrl },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
