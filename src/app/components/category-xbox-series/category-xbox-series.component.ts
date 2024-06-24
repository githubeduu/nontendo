import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarroService } from '../../services/carro.service';
import { UserService } from '../../services/usuario.service';

@Component({
  selector: 'app-category-xbox-series',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-xbox-series.component.html',
  styleUrl: './category-xbox-series.component.scss'
})
export class CategoryXboxSeriesComponent {
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
