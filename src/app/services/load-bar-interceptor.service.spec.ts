import { TestBed } from '@angular/core/testing';

import { LoadBarInterceptorService } from './load-bar-interceptor.service';

describe('LoadBarInterceptorService', () => {
  let service: LoadBarInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadBarInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
