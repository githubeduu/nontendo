import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPlaystation4Component } from './category-playstation-4.component';

describe('CategoryPlaystation4Component', () => {
  let component: CategoryPlaystation4Component;
  let fixture: ComponentFixture<CategoryPlaystation4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryPlaystation4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryPlaystation4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
