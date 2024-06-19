import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNintendoSwitchComponent } from './category-nintendo-switch.component';

describe('CategoryNintendoSwitchComponent', () => {
  let component: CategoryNintendoSwitchComponent;
  let fixture: ComponentFixture<CategoryNintendoSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryNintendoSwitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryNintendoSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
