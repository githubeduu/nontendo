import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/usuario.service';

interface User {
  name: string;
  email: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.scss'
})

export class CuentaComponent {
  currentUser: User;
  miFormulario: FormGroup;
  
  constructor(private userService: UserService, 
              private fb: FormBuilder,
              private router: Router) {
    this.currentUser = this.userService.getCurrentUser() || { name: '', email: '', username: '', password: '' };

    this.miFormulario = this.fb.group({
      name: [this.currentUser.name],
      email: [this.currentUser.email],
      username: [this.currentUser.username],
      password: [''],
      confirmPassword: ['']
    }); 
  }

  submitForm() {
    const updatedUser = {
      name: this.miFormulario.value.name,
      email: this.miFormulario.value.email,
      username: this.miFormulario.value.username,
      password: this.miFormulario.value.password
    };

    this.userService.updateUser(updatedUser);
    alert('Usuario actualizado');
  }

  logout() {
    this.userService.logout();
    this.currentUser = { name: '', email: '', username: '', password: '' };
    this.router.navigate(['/index']);
  }
}