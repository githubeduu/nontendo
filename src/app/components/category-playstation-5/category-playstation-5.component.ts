import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarroService } from '../../services/carro.service';

@Component({
  selector: 'app-category-playstation-5',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-playstation-5.component.html',
  styleUrl: './category-playstation-5.component.scss'
})
export class CategoryPlaystation5Component {
  carroService = inject(CarroService);


  agregarAlCarro(producto : any){
    this.carroService.agregarAlCarro(producto);
    alert('Producto Agregado correctamente');
  }
}
