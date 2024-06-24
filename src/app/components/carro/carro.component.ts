import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarroService } from '../../services/carro.service';
import { UserService } from '../../services/usuario.service';

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
  ) {
    this.currentUser = this.userService.getCurrentUser(); 
  }

  logout() {
    this.userService.logout(); // Elimina el usuario autenticado
    this.currentUser = null;
  }

  trackById(index: number, item: any): any {
    return item.id;
  }

  borrarDeCarro(item : any){
    this.carroService.borrarDeCarro(item)
  }

}
