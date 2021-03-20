import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { TipoTransfusion } from "../modelos/tipo-transfusion";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class TipoTransfusionService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<TipoTransfusion[]>  {
        return this.http.get<TipoTransfusion[]>(APPCONFIG.BASE_URL+"/tipotransfusion");
      }
     
      findById(id: number): Observable<TipoTransfusion> {
        return this.http.get<TipoTransfusion>(APPCONFIG.BASE_URL+"/tipotransfusion/" + id);
      }
     
      guardar(item: TipoTransfusion): Observable<TipoTransfusion> {
        return this.http.post<any>(APPCONFIG.BASE_URL+"/tipotransfusion",item);
      }
     
      eliminarPorId(id: number): Observable<boolean> {
        return this.http.delete<any>(APPCONFIG.BASE_URL+"/tipotransfusion/"+id);
      }
     
      actualizar(item: TipoTransfusion): Observable<TipoTransfusion> {
        return this.http.put<any>(APPCONFIG.BASE_URL+"/tipotransfusion",item);
      }
}