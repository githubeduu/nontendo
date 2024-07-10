import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://localhost:8081/productos';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProductsByCategoriaId(categoriaid: number): Observable<any[]> {
    const url = `${this.apiUrl}/categoria/${categoriaid}`;
    return this.http.get<any[]>(url);
  }

  agregarProducto(nuevoProducto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, nuevoProducto);
  }

  actualizarProducto(id: number, producto: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, producto);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
