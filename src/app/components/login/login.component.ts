import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/usuario.service';

/**
 * @description
 * Componente para el inicio de sesión de usuarios.
 * Permite a los usuarios autenticarse ingresando su nombre de usuario y contraseña.
 */

/**
 * @usageNotes
 * Este componente captura las credenciales del usuario a través de un formulario y las valida con el servicio de usuario.
 * Si las credenciales son correctas, el usuario se autentica y se redirige a la página de inicio.
 */

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router, private userService: UserService) {}

  @ViewChild('username') usernameInput!: ElementRef;
  @ViewChild('password') passwordInput!: ElementRef;

  onSubmit() {
    const username = this.usernameInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;
    const user = this.userService.getUserByUsername(username);

    if (!user || user.password !== password) {
      alert('Usuario o contraseña incorrectos');
      return;
    }

    alert('Usuario valido');
    this.userService.setCurrentUser(user);
    this.router.navigate(['/index']);
  }
}
