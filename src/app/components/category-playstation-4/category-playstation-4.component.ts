import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarroService } from '../../services/carro.service';

@Component({
  selector: 'app-category-playstation-4',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-playstation-4.component.html',
  styleUrl: './category-playstation-4.component.scss'
})
export class CategoryPlaystation4Component {
  carroService = inject(CarroService);


  agregarAlCarro(producto : any){
    this.carroService.agregarAlCarro(producto);
    alert('Producto Agregado correctamente');
  }
}
