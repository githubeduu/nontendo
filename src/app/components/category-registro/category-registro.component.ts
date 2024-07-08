import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/usuario.service';

/**
 * @description
 * Componente para el registro de usuarios.
 * Permite a los usuarios registrarse ingresando su nombre, email, nombre de usuario, contraseña y fecha de nacimiento.
 */

/**
 * @usageNotes
 * Este componente utiliza un formulario reactivo para recopilar la información del usuario.
 * Se deben cumplir ciertos requisitos de validación para completar el formulario correctamente.
 */

@Component({
  selector: 'app-category-registro',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './category-registro.component.html',
  styleUrl: './category-registro.component.scss'
})
export class CategoryRegistroComponent {
  miFormulario!: FormGroup;
  formSubmitted: boolean = false;
  currentUser: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService
  ) {
    this.currentUser = this.userService.getCurrentUser(); 
  }

  logout() {
    this.userService.logout(); // Elimina el usuario autenticado
    this.currentUser = null;
  }
  
  ngOnInit(): void {
    this.miFormulario = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      rut: ['', Validators.required],
      direccion: ['', Validators.required],
      comuna: ['', Validators.required],
      rolId: [3, Validators.required]
    });
  }
  
  /**
   * Valida que la contraseña cumpla con los requisitos mínimos.
   * @param control Control de formulario a validar.
   * @returns Objeto con el error si la contraseña es inválida, o nulo si es válida.
   */
  validatePassword(control: any): { [key: string]: boolean } | null {
    const password = control.value;
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const isValid = hasNumber && hasSpecialCharacter && hasLetter;

    return isValid ? null : { invalidPassword: true };
  }
  
  submitForm() {
    this.formSubmitted = true;
    if (this.miFormulario.valid) {
      const newUser = {
        username: this.miFormulario.get('username')!.value,
        password: this.miFormulario.get('password')!.value,
        nombre: this.miFormulario.get('name')!.value,
        rut: this.miFormulario.get('rut')!.value,
        direccion: this.miFormulario.get('direccion')!.value,
        comuna: this.miFormulario.get('comuna')!.value,
        rolId: this.miFormulario.get('rolId')!.value
      };

      this.userService.addUser(newUser).subscribe(
        () => {
          window.alert('Usuario registrado exitosamente');
          this.router.navigate(['/index']);
        },
        error => {
          console.error('Error al registrar usuario:', error);
          // Maneja el error apropiadamente (mostrar mensaje al usuario, registrar en consola, etc.)
        }
      );
    }
  }
}
