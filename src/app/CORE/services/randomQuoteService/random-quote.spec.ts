import { TestBed } from '@angular/core/testing';

import { RandomQuote } from './random-quote';

describe('RandomQuote', () => {
  let service: RandomQuote;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomQuote);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
