import { TestBed } from '@angular/core/testing';

import { MoveHandlerService } from './move-handler.service';

describe('MoveHandlerService', () => {
  let service: MoveHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoveHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
