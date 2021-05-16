import { TestBed } from '@angular/core/testing';

import { CoronaserviceService } from './coronaservice.service';

describe('CoronaserviceService', () => {
  let service: CoronaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoronaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
