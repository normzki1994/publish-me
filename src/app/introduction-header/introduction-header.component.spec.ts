import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionHeaderComponent } from './introduction-header.component';

describe('IntroductionHeaderComponent', () => {
  let component: IntroductionHeaderComponent;
  let fixture: ComponentFixture<IntroductionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroductionHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
