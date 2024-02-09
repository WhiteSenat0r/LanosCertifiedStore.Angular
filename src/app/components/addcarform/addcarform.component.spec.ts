import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcarformComponent } from './addcarform.component';

describe('AddcarformComponent', () => {
  let component: AddcarformComponent;
  let fixture: ComponentFixture<AddcarformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddcarformComponent]
    });
    fixture = TestBed.createComponent(AddcarformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
