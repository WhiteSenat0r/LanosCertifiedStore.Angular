import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalparametersComponent } from './technicalparameters.component';

describe('TechnicalparametersComponent', () => {
  let component: TechnicalparametersComponent;
  let fixture: ComponentFixture<TechnicalparametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechnicalparametersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalparametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
