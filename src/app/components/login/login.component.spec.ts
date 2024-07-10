import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, CommonModule],
      declarations: [LoginComponent], // Agrega LoginComponent a las declaraciones
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Mock para los elementos de input
    component.usernameInput.nativeElement.value = 'wrongUser';
    component.passwordInput.nativeElement.value = 'wrongPass';
  });

  // Prueba para verificar la alerta en caso de inicio de sesión incorrecto
  it('debería mostrar una alerta en caso de inicio de sesión incorrecto', () => {
    spyOn(window, 'alert');
    const event = new Event('submit');
    component.onSubmit(event);
  
    expect(window.alert).toHaveBeenCalledWith('Contraseña incorrecta');
  });

});
