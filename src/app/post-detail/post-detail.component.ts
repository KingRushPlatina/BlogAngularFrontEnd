import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  
})
export class PostDetailComponent implements OnInit {
  addPostRequest: Post = {
    id: 0,
    title: '',
    body: '',
    publishDate: new Date().toISOString(),
    autor: {
      id: 1,
      name: "Nome dell'autore",
      surname: "Cognome dell'autore",
      mail: 'mail@example.com',
    },
    comments: [
      {
        id: 1,
        text: 'Testo del commento',
        creationDate: new Date().toISOString(),
        commentator: {
          id: 1,
          name: "Nome dell'autore",
          surname: "Cognome dell'autore",
          mail: 'mail@example.com',
        },
      },
    ],
  };
  @ViewChild('content') content: any;
  @ViewChild('fileInput') fileInput: ElementRef | undefined; // Riferimento all'input file
  imagePreview: any; // Proprietà per la preview dell'immagine
  route: any;
  
  constructor(private postsService: PostsService, private router: Router,  private modalService: NgbModal ) {}

  ngOnInit(): void {}

  addPost(): void {
    // Crea un oggetto FormData e appendi i campi necessari, inclusa l'immagine
    const formData = new FormData();
    formData.append('title', this.addPostRequest.title);
    formData.append('body', this.addPostRequest.body);
    formData.append('authorid', '1');

    if (this.fileInput && this.fileInput.nativeElement.files.length > 0) {
      formData.append('file', this.fileInput.nativeElement.files[0]);
    }

    // Chiama il servizio per aggiungere il post
    this.postsService.addPoster(formData).subscribe(
      (response) => {
        console.log('Post added successfully:', response);
        this.postsService.setSuccessMessage('Post aggiunto con successo!');
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Error adding post:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['']);
  }

  UploadImage(): void {
    this.openModal(this.content);
  }

  ProceedUpload(): void {}

  openModal(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  handleImageChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}