import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any[] = [];
  private currentUser: any | null = null;

  constructor() {
    if (this.isLocalStorageAvailable()) {
      this.users = JSON.parse(localStorage.getItem('users') || '[]');
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
    }
  }

  getUserByUsername(username: string): any | undefined {
    return this.users.find(user => user.username === username);
  }

  setCurrentUser(user: any) {
    this.currentUser = user;
  }

  getCurrentUser(): any | null {
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
  }
}
