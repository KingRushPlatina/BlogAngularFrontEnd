import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
});
setSuccessMessage(message: string): void {
  this.successMessageSubject.next(message);
}

getSuccessMessage(): Observable<string> {
  return this.successMessageSubject.asObservable();
}