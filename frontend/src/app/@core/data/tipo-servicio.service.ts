import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { TipoServicio } from "../modelos/tipo-servicio";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class TipoServicioService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<TipoServicio[]>  {
        return this.http.get<TipoServicio[]>(APPCONFIG.BASE_URL+"/tiposervicio");
      }
     
      findById(id: number): Observable<TipoServicio> {
        return this.http.get<TipoServicio>(APPCONFIG.BASE_URL+"/tiposervicio/" + id);
      }
     
      guardar(item: TipoServicio): Observable<TipoServicio> {
        return this.http.post<any>(APPCONFIG.BASE_URL+"/tiposervicio",item);
      }
     
      eliminarPorId(id: number): Observable<boolean> {
        return this.http.delete<any>(APPCONFIG.BASE_URL+"/tiposervicio/"+id);
      }
     
      actualizar(item: TipoServicio): Observable<TipoServicio> {
        return this.http.put<any>(APPCONFIG.BASE_URL+"/tiposervicio",item);
      }
}