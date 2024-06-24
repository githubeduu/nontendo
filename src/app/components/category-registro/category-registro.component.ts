import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
  showSubMenu: boolean = false;
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
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.validatePassword
        ]
      ],
      confirmPassword: ['', Validators.required],
      username: ['', Validators.required],
      birthdate: ['', [Validators.required, this.minimumAgeValidator(16)]]
    }, { validators: this.passwordMatchValidator });
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
  
   /**
   * Valida que la contraseña coincida con la confirmación de contraseña.
   * @param form Formulario completo para validar.
   * @returns Objeto con el error si las contraseñas no coinciden, o nulo si coinciden.
   */
  private passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

   /**
   * Valida que la fecha de nacimiento sea mayor a la edad mínima especificada.
   * @param minAge Edad mínima permitida.
   * @returns Función de validación para la fecha de nacimiento.
   */
  private minimumAgeValidator(minAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthdate = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - birthdate.getFullYear();
      const m = today.getMonth() - birthdate.getMonth();
      return (age > minAge || (age === minAge && m >= 0)) ? null : { minAge: true };
    };
  }

  submitForm() {
    this.formSubmitted = true;
    if (this.miFormulario.valid){  

      const newUser = {
        name: this.miFormulario.get('name')!.value,
        email: this.miFormulario.get('email')!.value,
        username: this.miFormulario.get('username')!.value,
        password: this.miFormulario.get('password')!.value        
      };
      this.userService.addUser(newUser);


      console.log("Resultado: " + this.miFormulario.get('name')!.value);
      window.alert('Usuario registrado exitosamente');
      this.router.navigate(['/index']);
    }
  }
}
