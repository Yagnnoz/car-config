import { TestBed } from '@angular/core/testing';

import { ValidButtonsService } from './valid-buttons.service';

describe('ValidButtonsService', () => {
  let service: ValidButtonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidButtonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
