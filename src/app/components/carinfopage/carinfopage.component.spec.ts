import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarinfopageComponent } from './carinfopage.component';

describe('CarinfopageComponent', () => {
  let component: CarinfopageComponent;
  let fixture: ComponentFixture<CarinfopageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarinfopageComponent]
    });
    fixture = TestBed.createComponent(CarinfopageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
