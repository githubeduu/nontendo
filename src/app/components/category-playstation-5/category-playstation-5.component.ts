import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarroService } from '../../services/carro.service';
import { UserService } from '../../services/usuario.service';
import { JsonService } from '../../services/json.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-category-playstation-5',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './category-playstation-5.component.html',
  styleUrl: './category-playstation-5.component.scss'
})
export class CategoryPlaystation5Component {
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


  agregarAlCarro(producto : any){
    this.carroService.agregarAlCarro(producto);
    alert('Producto Agregado correctamente');
  }

  ngOnInit(): void {
    this.jsonService.getProducts().subscribe(
      (data: any) => {
        console.log('Received data:', data); // Verificar los datos recibidos
        if (data && data.productosList) {
          this.products = data.productosList;
          this.filteredProducts = this.products.filter(product => product.categoriaid === 4);
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
