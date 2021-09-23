import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMessageDetailPageComponent } from './admin-message-detail-page.component';

describe('AdminMessageDetailPageComponent', () => {
  let component: AdminMessageDetailPageComponent;
  let fixture: ComponentFixture<AdminMessageDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMessageDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMessageDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
