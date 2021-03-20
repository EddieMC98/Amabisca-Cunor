import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { PruebaSerologia } from "../modelos/prueba-serologia";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class PruebaSerologiaService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<PruebaSerologia[]>  {
        return this.http.get<PruebaSerologia[]>(APPCONFIG.BASE_URL+"/pruebaserologia");
      }
     
      findById(id: number): Observable<PruebaSerologia> {
        return this.http.get<PruebaSerologia>(APPCONFIG.BASE_URL+"/pruebaserologia/" + id);
      }
     
      guardar(item: PruebaSerologia): Observable<PruebaSerologia> {
        return this.http.post<PruebaSerologia>(APPCONFIG.BASE_URL+"/pruebaserologia",item);
      }
     
      eliminarPorId(id: number): Observable<boolean> {
        return this.http.delete<boolean>(APPCONFIG.BASE_URL+"/pruebaserologia/"+id);
      }
     
      actualizar(item: PruebaSerologia): Observable<PruebaSerologia> {
        return this.http.put<PruebaSerologia>(APPCONFIG.BASE_URL+"/pruebaserologia",item);
      }
}