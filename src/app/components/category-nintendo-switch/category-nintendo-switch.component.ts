import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarroService } from '../../services/carro.service';
import { UserService } from '../../services/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-category-nintendo-switch',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './category-nintendo-switch.component.html',
  styleUrl: './category-nintendo-switch.component.scss'
})
export class CategoryNintendoSwitchComponent {
  carroService = inject(CarroService);
  currentUser: any;
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor( private userService: UserService,
    private productosService: ProductosService
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

  ngOnInit(): void {
    this.productosService.getProductsByCategoriaId(2).subscribe(
      (data: any[]) => {
        console.log('Received data:', data); // Verifica los datos recibidos en la consola
        if (Array.isArray(data)) {
          this.products = data;
          this.filteredProducts = this.products.filter(product => product.categoriaid === 2);
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
