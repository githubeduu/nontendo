import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryRegistroComponent } from './category-registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CategoryRegistroComponent', () => {
  let component: CategoryRegistroComponent;
  let fixture: ComponentFixture<CategoryRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
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
    fixture = TestBed.createComponent(CategoryRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // 1
  it('debería crear el formulario con los controles correctos', () => {
    expect(component.miFormulario.contains('email')).toBeTrue();
    expect(component.miFormulario.contains('name')).toBeTrue();
    expect(component.miFormulario.contains('password')).toBeTrue();
    expect(component.miFormulario.contains('confirmPassword')).toBeTrue();
    expect(component.miFormulario.contains('username')).toBeTrue();
    expect(component.miFormulario.contains('birthdate')).toBeTrue();
  });

  // 2
  it('debería validar el formulario y manejar errores de validación al enviar', () => {
    component.miFormulario.setValue({
      email: 'invalid-email',
      name: '',
      password: '123',
      confirmPassword: '1234',
      username: '',
      birthdate: ''
    });

    component.submitForm();

    expect(component.miFormulario.valid).toBeFalse();
    expect(component.miFormulario.get('email')?.hasError('email')).toBeTrue();
    expect(component.miFormulario.get('name')?.hasError('required')).toBeTrue();
    expect(component.miFormulario.get('password')?.hasError('minlength')).toBeTrue();
    expect(component.miFormulario.hasError('mismatch')).toBeTrue();
    expect(component.miFormulario.get('username')?.hasError('required')).toBeTrue();
    expect(component.miFormulario.get('birthdate')?.hasError('required')).toBeTrue();
  });

  // 3
  it('debería navegar a la página de índice al enviar el formulario válido', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');

    component.miFormulario.setValue({
      email: 'test@example.com',
      name: 'Test User',
      password: 'Password#123',
      confirmPassword: 'Password#123',
      username: 'testuser',
      birthdate: '2000-01-01'
    });

    component.submitForm();

    expect(component.miFormulario.valid).toBeTrue();
    expect(navigateSpy).toHaveBeenCalledWith(['/index']);
  });
});

