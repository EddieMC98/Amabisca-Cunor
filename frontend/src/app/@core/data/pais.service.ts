import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { APPCONFIG } from '../constantes.module';
import { Pais } from '../modelos/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Pais[]>  {
    return this.http.get<Pais[]>(APPCONFIG.BASE_URL+"pais");
  }

  findById(id: number): Observable<Pais> {
    return this.http.get<Pais>(APPCONFIG.BASE_URL+"pais/" + id);
  }

  guardar(item: Pais): Observable<Pais> {
    return this.http.post<Pais>(APPCONFIG.BASE_URL+"pais",item);
  }

  eliminarPorId(id: number): Observable<boolean> {
    return this.http.delete<boolean>(APPCONFIG.BASE_URL+"pais/"+id);
  }

  actualizar(item: Pais): Observable<Pais> {
    return this.http.put<Pais>(APPCONFIG.BASE_URL+"pais/"+item.codPais,item);
  }
}
