import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryRegistroComponent } from './category-registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule si no está ya importado en tu módulo

describe('CategoryRegistroComponent', () => {
  let component: CategoryRegistroComponent;
  let fixture: ComponentFixture<CategoryRegistroComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        CommonModule, // Asegúrate de importar CommonModule si no está ya importado en tu módulo
      ],
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
    router = TestBed.inject(Router); // Obtener una instancia del Router
    fixture.detectChanges();
  });

  // Resto de las pruebas se mantienen igual

  // 1. Verificar que el formulario se crea con los controles correctos
  it('should create the form with correct controls', () => {
    expect(component.miFormulario.contains('username')).toBe(true);
    expect(component.miFormulario.contains('password')).toBe(true);
    expect(component.miFormulario.contains('name')).toBe(true);
    expect(component.miFormulario.contains('rut')).toBe(true);
    expect(component.miFormulario.contains('direccion')).toBe(true);
    expect(component.miFormulario.contains('comuna')).toBe(true);
    expect(component.miFormulario.contains('rolId')).toBe(true);
  });

  // 2. Validar el formulario y manejar errores de validación al enviar
  it('should validate form and handle validation errors on submit', () => {
    component.miFormulario.setValue({
      username: '',
      password: '123', // Contraseña demasiado corta
      name: '',
      rut: '',
      direccion: '',
      comuna: '',
      rolId: 3 // Se espera un ID válido, por ejemplo, 1, 2, 3, etc.
    });

    component.submitForm();

    expect(component.miFormulario.valid).toBe(false);
    expect(component.miFormulario.get('username')?.hasError('required')).toBe(true);
    expect(component.miFormulario.get('password')?.hasError('invalidLength')).toBe(true);
    expect(component.miFormulario.get('name')?.hasError('required')).toBe(true);
    expect(component.miFormulario.get('rut')?.hasError('required')).toBe(true);
    expect(component.miFormulario.get('direccion')?.hasError('required')).toBe(true);
    expect(component.miFormulario.get('comuna')?.hasError('required')).toBe(true);
    expect(component.miFormulario.get('rolId')?.hasError('required')).toBe(false); // Validar que el ID de rol no sea requerido si ya hay un valor
  });

  // 3. Navegar a la página de índice al enviar el formulario válido
  it('should navigate to index page on successful form submission', () => {
    const navigateSpy = spyOn(router, 'navigate'); // Usar el Router obtenido en lugar de component.router

    component.miFormulario.setValue({
      username: 'testuser',
      password: 'Password#123',
      name: 'Test User',
      rut: '123456789', // Rut válido
      direccion: 'Calle 123',
      comuna: 'Santiago',
      rolId: 3
    });

    component.submitForm();

    expect(component.miFormulario.valid).toBe(true);
    expect(navigateSpy).toHaveBeenCalledWith(['/index']);
  });
});
