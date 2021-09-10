import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorDetailsPageComponent } from './admin-author-details-page.component';

describe('AdminAuthorDetailsPageComponent', () => {
  let component: AdminAuthorDetailsPageComponent;
  let fixture: ComponentFixture<AdminAuthorDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAuthorDetailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuthorDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
