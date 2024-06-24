// user.service.ts
import { Injectable } from '@angular/core';

/**
 * @description
 * Servicio para la gestión de usuarios.
 * Permite agregar, obtener, actualizar y eliminar usuarios.
 */


/**
 * @usageNotes
 * Este servicio utiliza el almacenamiento local para almacenar la lista de usuarios y el usuario actualmente autenticado.
 * Los métodos proporcionados permiten realizar operaciones básicas de gestión de usuarios, como agregar, obtener, actualizar y eliminar usuarios.
 */


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any[] = [];
  private currentUser: any = null;

  constructor() {
    if (this.isLocalStorageAvailable()) {
      this.users = JSON.parse(localStorage.getItem('users') || '[]');
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    }
  }

   /**
   * Verifica si el almacenamiento local está disponible.
   * @returns `true` si el almacenamiento local está disponible, `false` en caso contrario.
   */
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

   /**
   * Agrega un nuevo usuario.
   * @param user Usuario a agregar.
   */
  addUser(user: any) {
    this.users.push(user);
    this.updateLocalStorage();
  }

  /**
   * Obtiene la lista de usuarios.
   * @returns Lista de usuarios.
   */
  getUsers() {
    return this.users;
  }

  private updateLocalStorage() {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('users', JSON.stringify(this.users));
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
  }

    /**
   * Obtiene un usuario por nombre de usuario.
   * @param username Nombre de usuario del usuario a buscar.
   * @returns El usuario encontrado o `undefined` si no se encontró.
   */
  getUserByUsername(username: string): any | undefined {
    return this.users.find(user => user.username === username);
  }

  setCurrentUser(user: any) {
    this.currentUser = user;
    this.updateLocalStorage();
  }

  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Actualiza la información de un usuario.
   * @param updatedUser Usuario con la información actualizada.
   */
  updateUser(updatedUser: any) {
    const index = this.users.findIndex(user => user.username === this.currentUser.username);
    if (index !== -1) {
      this.users[index] = {
        ...this.users[index],
        ...updatedUser
      };
      this.currentUser = this.users[index];
      this.updateLocalStorage();
    }
  }

  logout() {
    this.currentUser = null;
    this.updateLocalStorage();
  }
}
