import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMessagePageComponent } from './admin-message-page.component';

describe('AdminMessagePageComponent', () => {
  let component: AdminMessagePageComponent;
  let fixture: ComponentFixture<AdminMessagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMessagePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMessagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
