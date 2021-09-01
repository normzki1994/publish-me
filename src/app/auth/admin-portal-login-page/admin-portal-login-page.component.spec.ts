import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPortalLoginPageComponent } from './admin-portal-login-page.component';

describe('AdminPortalLoginPageComponent', () => {
  let component: AdminPortalLoginPageComponent;
  let fixture: ComponentFixture<AdminPortalLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPortalLoginPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPortalLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
