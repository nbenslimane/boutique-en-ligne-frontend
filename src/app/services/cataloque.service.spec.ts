import { TestBed } from '@angular/core/testing';

import { CataloqueService } from './cataloque.service';

describe('CataloqueService', () => {
  let service: CataloqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CataloqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
