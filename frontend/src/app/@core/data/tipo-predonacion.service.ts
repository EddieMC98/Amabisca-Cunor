import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { TipoPredonacion } from "../modelos/tipo-predonacion";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class TipoPredonacionService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<TipoPredonacion[]>  {
        return this.http.get<TipoPredonacion[]>(APPCONFIG.BASE_URL+"/tipopredonacion");
      }
     
      findById(id: number): Observable<TipoPredonacion> {
        return this.http.get<TipoPredonacion>(APPCONFIG.BASE_URL+"/tipopredonacion/" + id);
      }
     
      guardar(item: TipoPredonacion): Observable<TipoPredonacion> {
        return this.http.post<any>(APPCONFIG.BASE_URL+"/tipopredonacion",item);
      }
     
      eliminarPorId(id: number): Observable<boolean> {
        return this.http.delete<any>(APPCONFIG.BASE_URL+"/tipopredonacion/"+id);
      }
     
      actualizar(item: TipoPredonacion): Observable<TipoPredonacion> {
        return this.http.put<any>(APPCONFIG.BASE_URL+"/tipopredonacion",item);
      }
}
