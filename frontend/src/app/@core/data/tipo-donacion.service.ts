import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { TipoDonacion } from "../modelos/tipo-donacion";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class TipoDonacionService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<TipoDonacion[]>  {
        return this.http.get<TipoDonacion[]>(APPCONFIG.BASE_URL+"/tipodonacion");
      }
     
      findById(id: number): Observable<TipoDonacion> {
        return this.http.get<TipoDonacion>(APPCONFIG.BASE_URL+"/tipodonacion/" + id);
      }
     
      guardar(item: TipoDonacion): Observable<TipoDonacion> {
        return this.http.post<TipoDonacion>(APPCONFIG.BASE_URL+"/tipodonacion",item);
      }
     
      eliminarPorId(id: number): Observable<boolean> {
        return this.http.delete<boolean>(APPCONFIG.BASE_URL+"/tipodonacion/"+id);
      }
     
      actualizar(item: TipoDonacion): Observable<TipoDonacion> {
        return this.http.put<TipoDonacion>(APPCONFIG.BASE_URL+"/tipodonacion",item);
      }
}
