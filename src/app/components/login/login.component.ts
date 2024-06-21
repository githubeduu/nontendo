import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router) {}
  usuarioGuardado = 'edu';
  contraseñaGuardada = '1234';

  @ViewChild('username') usernameInput!: ElementRef;
  @ViewChild('password') passwordInput!: ElementRef;

  onSubmit() {
    let isValid = true;

    if (this.usernameInput.nativeElement.value !== this.usuarioGuardado || this.passwordInput.nativeElement.value !== this.contraseñaGuardada) {
      isValid = false;
      alert('Usuario o contraseña incorrectos');
    }

    if (isValid) {
      alert('usuario valido');
      // Aquí se redirige a index.html si el usuario y la contraseña son correctos
      this.router.navigate(['/index']);
    } else {
      alert('Por favor, corrige los errores en el formulario');
    }
  }
}
