import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  private items: any[] = [];

  constructor() {
    if (this.isLocalStorageAvailable()) {
      this.items = JSON.parse(localStorage.getItem('itemsCarro') || '[]');
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  agregarAlCarro(producto: any) {
    this.items.push({ ...producto, cantidad: 1 });
    this.updateLocalStorage();
  }

  getItems() {
    return this.items;
  }

  borrarDeCarro(item: any) {
    this.items = this.items.filter((i) => i.id !== item.id);
    this.updateLocalStorage();
  }

  sumarCantidad(id: number) {
    let item = this.items.find((i) => i.id === id);
    if (item) {
      item.cantidad++;
      this.updateLocalStorage();
    }
  }

  restarCantidad(id: number) {
    let item = this.items.find((i) => i.id === id);
    if (item) {
      item.cantidad--;
      this.updateLocalStorage();
    }
  }

  getTotal() {
    return this.items.reduce((acc, item) => {
      return acc + item.precio * item.cantidad;
    }, 0);
  }

  private updateLocalStorage() {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('itemsCarro', JSON.stringify(this.items));
    }
  }
}
