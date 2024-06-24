import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarroService } from '../../services/carro.service';
import { UserService } from '../../services/usuario.service';

@Component({
  selector: 'app-category-nintendo-switch',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-nintendo-switch.component.html',
  styleUrl: './category-nintendo-switch.component.scss'
})
export class CategoryNintendoSwitchComponent {
  carroService = inject(CarroService);
  currentUser: any;
  constructor( private userService: UserService
  ) {
    this.currentUser = this.userService.getCurrentUser(); 
  }

  logout() {
    this.userService.logout(); // Elimina el usuario autenticado
    this.currentUser = null;
  }

  agregarAlCarro(producto : any){
    this.carroService.agregarAlCarro(producto);
    alert('Producto Agregado correctamente');
  }
}
