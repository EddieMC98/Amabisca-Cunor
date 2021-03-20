import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { TipoComponente } from "../modelos/tipo_componente";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class TipoComponenteService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<TipoComponente[]>  {
        return this.http.get<TipoComponente[]>(APPCONFIG.BASE_URL+"/tipocomponente");
      }
     
      findById(id: number): Observable<TipoComponente> {
        return this.http.get<TipoComponente>(APPCONFIG.BASE_URL+"/tipocomponente/" + id);
      }
     
      guardar(item: TipoComponente): Observable<TipoComponente> {
        return this.http.post<TipoComponente>(APPCONFIG.BASE_URL+"/tipocomponente",item);
      }
     
      eliminarPorId(id: number): Observable<boolean> {
        return this.http.delete<boolean>(APPCONFIG.BASE_URL+"/tipocomponente/"+id);
      }
     
      actualizar(item: TipoComponente): Observable<TipoComponente> {
        return this.http.put<TipoComponente>(APPCONFIG.BASE_URL+"/tipocomponente",item);
      }
}
