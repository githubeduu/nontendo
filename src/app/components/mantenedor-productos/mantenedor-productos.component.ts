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
  styleUrls: ['./mantenedor-productos.component.scss']
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
  isEditMode: boolean = false;
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
  productoSeleccionado: any = null;
  showDeleteModal: boolean = false;
  productToDelete: any = null;

  openModal(editMode: boolean = false) {
    this.showModal = true;
    this.isEditMode = editMode;
  }

  closeModal() {
    this.showModal = false;
    this.isEditMode = false;
    this.productoSeleccionado = null;
    this.resetForm();
  }

  openDeleteModal(product: any) {
    this.showDeleteModal = true;
    this.productToDelete = product;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.productToDelete = null;
  }

  resetForm() {
    this.nuevoProducto = {
      nombre: '',
      descripcion: '',
      imagenurl: '',
      precio: null,
      descuento: false,
      categoriaid: 1
    };
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
    if (this.isEditMode && this.productoSeleccionado) {
      // Lógica para actualizar el producto existente
      this.productosService.actualizarProducto(this.productoSeleccionado.id, this.nuevoProducto).subscribe(
        (response) => {
          console.log('Producto actualizado correctamente:', response);
          this.ngOnInit();
          this.closeModal();
          alert('Producto actualizado correctamente');
        },
        (error) => {
          console.error('Error al actualizar producto:', error);
          alert('Error al actualizar producto');
        }
      );
    } else {
      // Lógica para agregar un nuevo producto
      console.log('Guardando producto:', this.nuevoProducto);
      this.productosService.agregarProducto(this.nuevoProducto).subscribe(
        (response) => {
          console.log('Producto agregado correctamente:', response);
          this.ngOnInit();
          this.closeModal();
          alert('Producto agregado correctamente');
        },
        (error) => {
          console.error('Error al agregar producto:', error);
          alert('Error al agregar producto');
        }
      );
    }
  }

  eliminarProducto() {
    if (this.productToDelete) {
      this.productosService.eliminarProducto(this.productToDelete.id).subscribe(
        (response) => {
          console.log('Producto eliminado correctamente:', response);
          this.ngOnInit();
          this.closeDeleteModal();
          alert('Producto eliminado correctamente');
        },
        (error) => {
          console.error('Error al eliminar producto:', error);
          alert('Error al eliminar producto');
        }
      );
    }
  }

  editarProducto(id: number): void {
    const producto = this.products.find(p => p.id === id);
    if (producto) {
      this.productoSeleccionado = producto;
      this.nuevoProducto = { ...producto };
      this.openModal(true);
    }
  }
}
