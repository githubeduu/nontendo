import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ElementRef } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, CommonModule, LoginComponent],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    component.usernameInput = new ElementRef(fixture.nativeElement.querySelector('#username'));
    component.passwordInput = new ElementRef(fixture.nativeElement.querySelector('#password'));
  });

  // Prueba 1: Verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba 2: Verificar la funcionalidad del método onSubmit para credenciales incorrectas
  it('debería mostrar una alerta en caso de inicio de sesión incorrecto', () => {
    component.usernameInput.nativeElement.value = 'wrongUser';
    component.passwordInput.nativeElement.value = 'wrongPass';
    
    spyOn(window, 'alert');
    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Usuario o contraseña incorrectos');
  });
});
