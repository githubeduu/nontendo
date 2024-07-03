import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { CarroService } from '../../services/carro.service';
import { UserService } from '../../services/usuario.service';
import { JsonService } from '../../services/json.service';

@Component({
  selector: 'app-category-xbox-series',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule], // Agrega HttpClientModule a imports
  templateUrl: './category-xbox-series.component.html',
  styleUrls: ['./category-xbox-series.component.scss'] // Corrige el nombre a styleUrls
})
export class CategoryXboxSeriesComponent {
  carroService = inject(CarroService);
  currentUser: any;
  products: any[] = [];
  filteredProducts: any[] = [];
  constructor( private userService: UserService,
               private jsonService: JsonService
  ) {
    this.currentUser = this.userService.getCurrentUser(); 
  }

  logout() {
    this.userService.logout(); // Elimina el usuario autenticado
    this.currentUser = null;
  }

  agregarAlCarro(producto: any) {
    this.carroService.agregarAlCarro(producto);
    alert('Producto Agregado correctamente');
  }

  ngOnInit(): void {
    this.jsonService.getProducts().subscribe(
      (data: any) => {
        console.log('Received data:', data); // Verificar los datos recibidos
        if (data && data.productosList) {
          this.products = data.productosList;
          this.filteredProducts = this.products.filter(product => product.categoriaid === 1);
          console.log('Filtered products:', this.filteredProducts); // Verificar productos filtrados
        } else {
          console.error('Response format is unexpected:', data);
          this.products = []; // Manejo de respuesta inesperada
        }
      },
      error => {
        console.error('Error fetching products:', error);
        // Manejo de errores
      }
    );
  }
}