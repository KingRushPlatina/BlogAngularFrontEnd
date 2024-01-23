import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  addPostForm: FormGroup;
  imagePreview: any;
  @ViewChild('content') content: any;

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.addPostForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      file: [null, Validators.required], // Aggiunto controllo required per il campo del file
    });
  }

  ngOnInit(): void {}

  addPost(): void {
    const formData = new FormData();
    const fileInput = document.getElementById('file') as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      formData.append('file', file, file.name);
      formData.append('Head', this.addPostForm.value.title);
      formData.append('Body', this.addPostForm.value.body);

      this.postsService.uploadFile(formData).subscribe(
        (response) => {
          console.log('got response', response);
          this.postsService.setSuccessMessage('Post aggiunto con successo!');
          this.router.navigate(['']);
        },
        (error: any) => console.error('got error', error)
      );
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
