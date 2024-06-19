import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPlaystation5Component } from './category-playstation-5.component';

describe('CategoryPlaystation5Component', () => {
  let component: CategoryPlaystation5Component;
  let fixture: ComponentFixture<CategoryPlaystation5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryPlaystation5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryPlaystation5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
