import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryNintendoSwitchComponent } from './category-nintendo-switch.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('CategoryNintendoSwitchComponent', () => {
  let component: CategoryNintendoSwitchComponent;
  let fixture: ComponentFixture<CategoryNintendoSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [],
      providers: [
        { 
          provide: ActivatedRoute, 
          useValue: { params: of({ id: 123 }) } 
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryNintendoSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
