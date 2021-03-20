import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { UnidadDescartada } from "../modelos/unidad-descartada";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class UnidadDescartadaService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<UnidadDescartada[]>  {
        return this.http.get<UnidadDescartada[]>(APPCONFIG.BASE_URL+"/unidaddescartada");
      }
     
      findById(id: number): Observable<UnidadDescartada> {
        return this.http.get<UnidadDescartada>(APPCONFIG.BASE_URL+"/unidaddescartada/" + id);
      }
     
      guardar(item: UnidadDescartada): Observable<UnidadDescartada> {
        return this.http.post<any>(APPCONFIG.BASE_URL+"/unidaddescartada",item);
      }
     
      eliminarPorId(id: number): Observable<boolean> {
        return this.http.delete<any>(APPCONFIG.BASE_URL+"/unidaddescartada/"+id);
      }
     
      actualizar(item: UnidadDescartada): Observable<UnidadDescartada> {
        return this.http.put<any>(APPCONFIG.BASE_URL+"/unidaddescartada",item);
      }
}