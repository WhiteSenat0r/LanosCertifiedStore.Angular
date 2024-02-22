import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsearchbarComponent } from './adminsearchbar.component';

describe('AdminsearchbarComponent', () => {
  let component: AdminsearchbarComponent;
  let fixture: ComponentFixture<AdminsearchbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminsearchbarComponent]
    });
    fixture = TestBed.createComponent(AdminsearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
