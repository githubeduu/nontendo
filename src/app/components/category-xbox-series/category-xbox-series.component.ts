import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { CarroService } from '../../services/carro.service';
import { UserService } from '../../services/usuario.service';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-category-xbox-series',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule], // Agrega HttpClientModule a imports
  templateUrl: './category-xbox-series.component.html',
  styleUrls: ['./category-xbox-series.component.scss']
})
export class CategoryXboxSeriesComponent implements OnInit {
  currentUser: any;
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(
    private userService: UserService,
    private productosService: ProductosService,
    private carroService: CarroService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    
    this.productosService.getProductsByCategoriaId(1).subscribe(
      (data: any[]) => {
        console.log('Received data:', data); // Verifica los datos recibidos en la consola
        if (Array.isArray(data)) {
          this.products = data;
          this.filteredProducts = this.products.filter(product => product.categoriaid === 1);
          console.log('Filtered products:', this.filteredProducts); // Verifica productos filtrados
        } else {
          console.error('Response format is unexpected:', data);
          this.products = []; // Manejo de respuesta inesperada
        }
      },
      error => {
        console.error('Error fetching products:', error); // Manejo de errores
        // Puedes añadir lógica adicional para manejar errores
      }
    );
  }

  logout() {
    this.userService.logout();
    this.currentUser = null;
  }

  agregarAlCarro(producto: any) {
    this.carroService.agregarAlCarro(producto);
    alert('Producto Agregado correctamente');
  }
}