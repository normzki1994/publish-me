import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorPageComponent } from './admin-author-page.component';

describe('AdminAuthorPageComponent', () => {
  let component: AdminAuthorPageComponent;
  let fixture: ComponentFixture<AdminAuthorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAuthorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuthorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
