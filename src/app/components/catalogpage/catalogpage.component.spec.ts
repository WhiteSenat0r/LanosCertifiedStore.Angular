import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogpageComponent } from './catalogpage.component';

describe('CatalogpageComponent', () => {
  let component: CatalogpageComponent;
  let fixture: ComponentFixture<CatalogpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogpageComponent]
    });
    fixture = TestBed.createComponent(CatalogpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
