import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { UnidadIntercambio } from "../modelos/unidad-intercambio";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class UnidadIntercambioService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<UnidadIntercambio[]>  {
        return this.http.get<UnidadIntercambio[]>(APPCONFIG.BASE_URL+"/unidadintercambio");
      }
     
      findById(id: number): Observable<UnidadIntercambio> {
        return this.http.get<UnidadIntercambio>(APPCONFIG.BASE_URL+"/unidadintercambio/" + id);
      }
     
      guardar(item: UnidadIntercambio): Observable<UnidadIntercambio> {
        return this.http.post<any>(APPCONFIG.BASE_URL+"/unidadintercambio",item);
      }
     
      eliminarPorId(id: number): Observable<boolean> {
        return this.http.delete<any>(APPCONFIG.BASE_URL+"/unidadintercambio/"+id);
      }
     
      actualizar(item: UnidadIntercambio): Observable<UnidadIntercambio> {
        return this.http.put<any>(APPCONFIG.BASE_URL+"/unidadintercambio",item);
      }
}