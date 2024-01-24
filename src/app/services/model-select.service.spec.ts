import { TestBed } from '@angular/core/testing';

import { ModelSelectService } from './model-select.service';

describe('ModelSelectService', () => {
  let service: ModelSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
