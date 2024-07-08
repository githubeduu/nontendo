// user.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

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

  private baseUrl = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) {

  }

  private users: any[] = [];
  private currentUser: any = null;

  addUser(user: any): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }


 authenticate(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${this.baseUrl}/signin`, loginData, { observe: 'response' });
  }

  getCurrentUser() {
    return this.currentUser;
  }

  

  setCurrentUser(user: any) {
    this.currentUser = user;
  }


  logout() {
    this.currentUser = null;
  }
}
