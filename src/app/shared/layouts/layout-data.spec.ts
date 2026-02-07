import { TestBed } from '@angular/core/testing';
import { LayoutDataService } from './layout-data';

describe('LayoutData', () => {
  let service: LayoutDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
