import { TestBed } from '@angular/core/testing';

import { FullBlockService } from './full-block.service';

describe('FullBlockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FullBlockService = TestBed.get(FullBlockService);
    expect(service).toBeTruthy();
  });
});
