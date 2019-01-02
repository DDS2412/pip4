import { TestBed } from '@angular/core/testing';

import { PointServiceService } from './point-service.service';

describe('PointServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PointServiceService = TestBed.get(PointServiceService);
    expect(service).toBeTruthy();
  });
});
