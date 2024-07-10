import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarroService } from '../../services/carro.service';
import { UserService } from '../../services/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-category-playstation-5',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './category-playstation-5.component.html',
  styleUrl: './category-playstation-5.component.scss'
})
export class CategoryPlaystation5Component implements OnInit {
  carroService = inject(CarroService);
  currentUser: any;
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor( private userService: UserService,
    private productosService: ProductosService
  ) {}

  logout() {
    this.userService.logout();
    this.currentUser = null;
  }

  agregarAlCarro(producto : any){
    this.carroService.agregarAlCarro(producto);
    alert('Producto Agregado correctamente');
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();

    this.productosService.getProductsByCategoriaId(4).subscribe(
      (data: any[]) => {
        console.log('Received data:', data); // Verifica los datos recibidos en la consola
        if (Array.isArray(data)) {
          this.products = data;
          this.filteredProducts = this.products.filter(product => product.categoriaid === 4);
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
}
