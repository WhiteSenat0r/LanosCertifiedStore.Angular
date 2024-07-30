import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaincharacteristicsComponent } from './maincharacteristics.component';

describe('MaincharacteristicsComponent', () => {
  let component: MaincharacteristicsComponent;
  let fixture: ComponentFixture<MaincharacteristicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaincharacteristicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaincharacteristicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
