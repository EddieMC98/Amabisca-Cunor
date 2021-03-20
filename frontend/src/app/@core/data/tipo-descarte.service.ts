import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { TipoDescarte } from "../modelos/tipo-descarte";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class TipoDescarteService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<TipoDescarte[]>  {
        return this.http.get<TipoDescarte[]>(APPCONFIG.BASE_URL+"/tipodescarte");
      }
     
      findById(id: number): Observable<TipoDescarte> {
        return this.http.get<TipoDescarte>(APPCONFIG.BASE_URL+"/tipodescarte/" + id);
      }
     
      guardar(item: TipoDescarte): Observable<TipoDescarte> {
        return this.http.post<TipoDescarte>(APPCONFIG.BASE_URL+"/tipodescarte",item);
      }
     
      eliminarPorId(id: number): Observable<boolean> {
        return this.http.delete<boolean>(APPCONFIG.BASE_URL+"/tipodescarte/"+id);
      }
     
      actualizar(item: TipoDescarte): Observable<TipoDescarte> {
        return this.http.put<TipoDescarte>(APPCONFIG.BASE_URL+"/tipodescarte",item);
      }
}
