import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagebannerComponent } from './homepagebanner.component';

describe('HomepagebannerComponent', () => {
  let component: HomepagebannerComponent;
  let fixture: ComponentFixture<HomepagebannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepagebannerComponent]
    });
    fixture = TestBed.createComponent(HomepagebannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
