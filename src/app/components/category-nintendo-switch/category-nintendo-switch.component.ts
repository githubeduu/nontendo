import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarroService } from '../../services/carro.service';

@Component({
  selector: 'app-category-nintendo-switch',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-nintendo-switch.component.html',
  styleUrl: './category-nintendo-switch.component.scss'
})
export class CategoryNintendoSwitchComponent {
  carroService = inject(CarroService);


  agregarAlCarro(producto : any){
    this.carroService.agregarAlCarro(producto);
    alert('Producto Agregado correctamente');
  }
}
