import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private fb: FormBuilder,
              private router: Router
  ) {}
  
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

  validatePassword(control: any): { [key: string]: boolean } | null {
    const password = control.value;
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const isValid = hasNumber && hasSpecialCharacter && hasLetter;

    return isValid ? null : { invalidPassword: true };
  }
  
  private passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

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
      console.log("Resultado: " + this.miFormulario.get('name')!.value);
      window.alert('Usuario registrado exitosamente');
      this.router.navigate(['/index']);
    }
  }
}
