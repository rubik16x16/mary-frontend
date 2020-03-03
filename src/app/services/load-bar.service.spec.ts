import { TestBed } from '@angular/core/testing';

import { LoadBarService } from './load-bar.service';

describe('LoadBarService', () => {
  let service: LoadBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ]
    });
    service = TestBed.inject(LoadBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
