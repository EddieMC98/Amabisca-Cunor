import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { TipoSangre } from "../modelos/tipo-sangre";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class TipoSangreService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<TipoSangre[]>  {
        return this.http.get<TipoSangre[]>(APPCONFIG.BASE_URL+"/tiposangre");
      }
     
      findById(id: number): Observable<TipoSangre> {
        return this.http.get<TipoSangre>(APPCONFIG.BASE_URL+"/tiposangre/" + id);
      }
     
      guardar(item: TipoSangre): Observable<TipoSangre> {
        return this.http.post<any>(APPCONFIG.BASE_URL+"/tiposangre",item);
      }
     
      eliminarPorId(id: number): Observable<boolean> {
        return this.http.delete<any>(APPCONFIG.BASE_URL+"/tiposangre/"+id);
      }
     
      actualizar(item: TipoSangre): Observable<TipoSangre> {
        return this.http.put<any>(APPCONFIG.BASE_URL+"/tiposangre",item);
      }
}
