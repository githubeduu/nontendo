import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryPlaystation4Component } from './category-playstation-4.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('CategoryPlaystation4Component', () => {
  let component: CategoryPlaystation4Component;
  let fixture: ComponentFixture<CategoryPlaystation4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
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
    fixture = TestBed.createComponent(CategoryPlaystation4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
