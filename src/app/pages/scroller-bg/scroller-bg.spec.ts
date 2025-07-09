import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollerBg } from './scroller-bg';

describe('ScrollerBg', () => {
  let component: ScrollerBg;
  let fixture: ComponentFixture<ScrollerBg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollerBg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollerBg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
