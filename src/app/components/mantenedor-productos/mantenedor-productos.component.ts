import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonService } from '../../services/json.service';
import { UserService } from '../../services/usuario.service';
import { CarroService } from '../../services/carro.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mantenedor-productos',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './mantenedor-productos.component.html',
  styleUrl: './mantenedor-productos.component.scss'
})
export class MantenedorProductosComponent implements OnInit {
  constructor( private userService: UserService,
    private jsonService: JsonService
) {
this.currentUser = this.userService.getCurrentUser(); 
}
  carroService = inject(CarroService);
  currentUser: any;
  products: any[] = [];
  product: any = {};
  filteredProducts: any[] = [];

  logout() {
    this.userService.logout();
    this.currentUser = null;
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.jsonService.getProducts().subscribe(
      (data: any) => {
        if (data && data.productosList) {
          this.products = data.productosList;
        } else {
          console.error('Unexpected response format:', data);
          this.products = [];
        }
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  onSubmit(form: any) {
    if (this.product.id) {
      this.jsonService.updateProduct(this.product).subscribe(
        () => {
          this.loadProducts();
          form.resetForm();
        },
        error => {
          console.error('Error updating product:', error);
        }
      );
    } else {
      this.jsonService.addProduct(this.product).subscribe(
        () => {
          this.loadProducts();
          form.resetForm();
        },
        error => {
          console.error('Error adding product:', error);
        }
      );
    }
  }

  editProduct(product: any) {
    this.product = { ...product };
  }

  deleteProduct(productId: string) {
    this.jsonService.deleteProduct(productId).subscribe(
      () => {
        this.loadProducts();
      },
      error => {
        console.error('Error deleting product:', error);
      }
    );
  }
}