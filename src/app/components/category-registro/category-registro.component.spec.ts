import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryRegistroComponent } from './category-registro.component';

describe('CategoryRegistroComponent', () => {
  let component: CategoryRegistroComponent;
  let fixture: ComponentFixture<CategoryRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryRegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
