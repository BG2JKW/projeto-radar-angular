import { TestBed } from '@angular/core/testing';

import { CampanhaService } from './campanha.service';

describe('CampanhaService', () => {
  let service: CampanhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampanhaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
