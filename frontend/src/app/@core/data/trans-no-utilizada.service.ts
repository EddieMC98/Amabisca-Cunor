import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { TransNoUtilizada } from "../modelos/trans-no-utilizada";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class TransNoUtilizadaService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<TransNoUtilizada[]>  {
        return this.http.get<TransNoUtilizada[]>(APPCONFIG.BASE_URL+"/transnoutilizada");
      }
     
      findById(id: number): Observable<TransNoUtilizada> {
        return this.http.get<TransNoUtilizada>(APPCONFIG.BASE_URL+"/transnoutilizada/" + id);
      }
     
      guardar(item: TransNoUtilizada): Observable<TransNoUtilizada> {
        return this.http.post<any>(APPCONFIG.BASE_URL+"/transnoutilizada",item);
      }
     
      eliminarPorId(id: number): Observable<boolean> {
        return this.http.delete<any>(APPCONFIG.BASE_URL+"/transnoutilizada/"+id);
      }
     
      actualizar(item: TransNoUtilizada): Observable<TransNoUtilizada> {
        return this.http.put<any>(APPCONFIG.BASE_URL+"/transnoutilizada",item);
      }
}