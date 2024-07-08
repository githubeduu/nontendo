import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/usuario.service';
import { CarroService } from '../../services/carro.service';
import { RouterModule } from '@angular/router';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-mantenedor-productos',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './mantenedor-productos.component.html',
  styleUrl: './mantenedor-productos.component.scss'
})
export class MantenedorProductosComponent implements OnInit {
  constructor( private userService: UserService,
    private productosService: ProductosService
) {
this.currentUser = this.userService.getCurrentUser(); 
}
  carroService = inject(CarroService);
  currentUser: any;
  showModal: boolean = false;
  products: any[] = [];
  filteredProducts: any[] = [];
  nuevoProducto: any = {
    nombre: '',
    descripcion: '',
    imagenurl: '',
    precio: null,
    descuento: false,
    categoriaid: 1
  };

  
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }


  logout() {
    this.userService.logout();
    this.currentUser = null;
  }

  ngOnInit(): void {
    this.productosService.getAllProducts().subscribe(
      (data: any[]) => {
        console.log('Received data:', data);
        if (Array.isArray(data)) {
          this.products = data;
        } else {
          console.error('Response format is unexpected:', data);
          this.products = [];
        }
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  guardarProducto() {
    console.log('Guardando producto:', this.nuevoProducto);
    this.productosService.agregarProducto(this.nuevoProducto).subscribe(
      (response) => {
        console.log('Producto agregado correctamente:', response);
        this.ngOnInit();        
        this.closeModal();
        alert('Producto agregado correctamente');
      },
      (error) => {
        alert('Producto agregado correctamente');
        console.error('Error al agregar producto:', error);
      }
    );
  }

  eliminarProducto(id: number): void {
    // Aquí iría la lógica para eliminar el producto con el id proporcionado
    console.log('Eliminar producto con id:', id);
    // Ejemplo de cómo podrías implementar la eliminación
    // this.productosService.deleteProduct(id).subscribe(
    //   response => {
    //     console.log('Producto eliminado:', response);
    //     // Volver a cargar la lista de productos después de eliminar
    //     this.loadProducts();
    //   },
    //   error => {
    //     console.error('Error al eliminar producto:', error);
    //   }
    // );
  }

  editarProducto(id: number): void {
    // Aquí iría la lógica para editar el producto con el id proporcionado
    console.log('Editar producto con id:', id);
    // Ejemplo de cómo podrías implementar la edición
    // this.router.navigate(['/editar-producto', id]); // Redirigir a la página de edición del producto
  }


}