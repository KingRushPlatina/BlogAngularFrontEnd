import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [MessageService]
})
export class PostDetailComponent implements OnInit {
  addPostForm: FormGroup;
  imagePreview: any;
  @ViewChild('content') content: any;

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private router: Router,
    private modalService: NgbModal,
    private messageService: MessageService
  ) {
    this.addPostForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      file: [null, Validators.required], 
      
    });
  }

  ngOnInit(): void {}

  addPost(): void {
    const formData = new FormData();
    const fileInput = document.getElementById('file') as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      formData.append('File', file, file.name);
      formData.append('Head', this.addPostForm.value.title);
      formData.append('Body', this.addPostForm.value.body);
      formData.append('AutorId' ,'1');

      this.postsService.uploadFile(formData).subscribe({
        next: (data: Post) => {
          console.log('got response', data);
          this.postsService.setSuccessMessage('Post aggiunto con successo!');
          console.log("Ci siamo")
      
          this.router.navigate(['']);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
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
  get formControls() {
    return this.addPostForm.controls;
  }
}
