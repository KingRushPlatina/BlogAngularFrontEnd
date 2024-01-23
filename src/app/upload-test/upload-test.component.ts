// upload-test.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, map, of } from 'rxjs';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-upload-test',
  templateUrl: './upload-test.component.html',
  styleUrls: ['./upload-test.component.css']
})
export class UploadFormComponent {
  uploadForm: FormGroup;

  constructor(private fb: FormBuilder, private postsService: PostsService) {
    this.uploadForm = this.fb.group({
      file: ['']
    });
  }

  upload(event: Event): void {
    const inputElement = document.getElementById('file') as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('Head', 'I AM THE ADDITIONAL PROP!');
      formData.append('Body', 'I AM THE ADDITIONAL PROP!');
      console.log(file);

      this.postsService.uploadFile(formData)
        .subscribe(
          (res) => console.log('got response', res),
          (error: any) => console.error('got error', error)
        );
    }
  }
}
