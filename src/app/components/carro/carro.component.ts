import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarroService } from '../../services/carro.service';

@Component({
  selector: 'app-carro',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carro.component.html',
  styleUrl: './carro.component.scss'
})
export class CarroComponent {
  carroService = inject(CarroService);

  trackById(index: number, item: any): any {
    return item.id;
  }

  borrarDeCarro(item : any){
    this.carroService.borrarDeCarro(item)
  }

}
