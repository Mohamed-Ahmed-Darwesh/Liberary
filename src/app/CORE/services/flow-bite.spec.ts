import { TestBed } from '@angular/core/testing';

import { FlowBite } from './flow-bite';

describe('FlowBite', () => {
  let service: FlowBite;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowBite);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
