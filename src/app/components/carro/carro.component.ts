import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarroService } from '../../services/carro.service';
import { UserService } from '../../services/usuario.service';
/**
 * @description
 * Componente para mostrar y gestionar el carro de compras.
 * Permite a los usuarios ver los productos agregados al carro y eliminar productos del carro.
 */

/**
 * @usageNotes
 * Este componente muestra una lista de productos en el carro de compras.
 * Los usuarios pueden eliminar productos del carro haciendo clic en un botón de eliminar.
 */


@Component({
  selector: 'app-carro',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carro.component.html',
  styleUrl: './carro.component.scss'
})
export class CarroComponent {
  carroService = inject(CarroService);
  currentUser: any;
  constructor( private userService: UserService
  ) {}

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
  }

  logout() {
    this.userService.logout();
    this.currentUser = null;
  }

  /**
   * Función para identificar elementos en una lista por su ID.
   * @param index Índice del elemento en la lista.
   * @param item Elemento de la lista.
   * @returns ID del elemento.
   */
  trackById(index: number, item: any): any {
    return item.id;
  }

  /**
   * Elimina un elemento del carro de compras.
   * @param item Elemento a eliminar del carro de compras.
   */
  borrarDeCarro(item : any){
    this.carroService.borrarDeCarro(item)
  }

}
