import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { TipoEnvio } from "../modelos/tipoenvio";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoEnvioService {
  constructor(private http: HttpClient) {
  }

  findAll(): Observable<TipoEnvio[]>  {
      return this.http.get<TipoEnvio[]>(APPCONFIG.BASE_URL+"TipoEnvio");
    }
   
    findById(id: number): Observable<TipoEnvio> {
      return this.http.get<TipoEnvio>(APPCONFIG.BASE_URL+"TipoEnvio/" + id);
    }
   
    guardar(item: TipoEnvio): Observable<TipoEnvio> {
      return this.http.post<any>(APPCONFIG.BASE_URL+"TipoEnvio",item);
    }
   
    eliminarPorId(id: number): Observable<boolean> {
      return this.http.delete<any>(APPCONFIG.BASE_URL+"TipoEnvio/"+id);
    }
   
    actualizar(item: TipoEnvio): Observable<TipoEnvio> {
      return this.http.put<any>(APPCONFIG.BASE_URL+"TipoEnvio/"+item.codTipoEnvio,item);
    }
}

