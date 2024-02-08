import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilehomepageComponent } from './tilehomepage.component';

describe('TilehomepageComponent', () => {
  let component: TilehomepageComponent;
  let fixture: ComponentFixture<TilehomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TilehomepageComponent]
    });
    fixture = TestBed.createComponent(TilehomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
