import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { Marca } from "../modelos/marca";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Marca[]>  {
      return this.http.get<Marca[]>(APPCONFIG.BASE_URL+"marca");
    }
   
    findById(id: number): Observable<Marca> {
      return this.http.get<Marca>(APPCONFIG.BASE_URL+"marca/" + id);
    }
   
    guardar(item: Marca): Observable<Marca> {
      return this.http.post<any>(APPCONFIG.BASE_URL+"marca",item);
    }
   
    eliminarPorId(id: number): Observable<boolean> {
      return this.http.delete<any>(APPCONFIG.BASE_URL+"marca/"+id);
    }
   
    actualizar(item: Marca): Observable<Marca> {
      return this.http.put<any>(APPCONFIG.BASE_URL+"marca/"+item.codMarca,item);
    }
}

