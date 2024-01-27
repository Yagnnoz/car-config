import { TestBed } from '@angular/core/testing';

import { CarStoreService } from './car-store.service';

describe('CarStoreService', () => {
  let service: CarStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
