// user.service.ts
import { Injectable } from '@angular/core';

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

  addUser(user: any) {
    this.users.push(user);
    this.updateLocalStorage();
  }

  getUsers() {
    return this.users;
  }

  private updateLocalStorage() {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('users', JSON.stringify(this.users));
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
  }

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
