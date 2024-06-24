import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarroService } from '../../services/carro.service';
import { UserService } from '../../services/usuario.service';

@Component({
  selector: 'app-category-playstation-4',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-playstation-4.component.html',
  styleUrl: './category-playstation-4.component.scss'
})
export class CategoryPlaystation4Component {
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
