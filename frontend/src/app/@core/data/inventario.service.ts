import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { APPCONFIG } from '../constantes.module';
import { Inventario } from '../modelos/inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Inventario[]>  {
    return this.http.get<Inventario[]>(APPCONFIG.BASE_URL+"inventario");
  }

  findById(id: number): Observable<Inventario> {
    return this.http.get<Inventario>(APPCONFIG.BASE_URL+"inventario/" + id);
  }

  guardar(item: Inventario): Observable<Inventario> {
    return this.http.post<Inventario>(APPCONFIG.BASE_URL+"inventario",item);
  }

  eliminarPorId(id: number): Observable<boolean> {
    return this.http.delete<boolean>(APPCONFIG.BASE_URL+"inventario/"+id);
  }

  actualizar(item: Inventario): Observable<Inventario> {
    return this.http.put<Inventario>(APPCONFIG.BASE_URL+"inventario/"+item.codInventario,item);
  }
}
