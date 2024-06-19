import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryXboxSeriesComponent } from './category-xbox-series.component';

describe('CategoryXboxSeriesComponent', () => {
  let component: CategoryXboxSeriesComponent;
  let fixture: ComponentFixture<CategoryXboxSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryXboxSeriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryXboxSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
