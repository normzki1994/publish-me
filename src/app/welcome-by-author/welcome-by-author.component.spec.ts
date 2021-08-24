import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeByAuthorComponent } from './welcome-by-author.component';

describe('WelcomeByAuthorComponent', () => {
  let component: WelcomeByAuthorComponent;
  let fixture: ComponentFixture<WelcomeByAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeByAuthorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeByAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
