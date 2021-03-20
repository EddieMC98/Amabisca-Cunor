import { Injectable } from '@angular/core';
import { APPCONFIG } from '../constantes.module';
import { Configuracion } from "../modelos/configuracion";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class ConfiguracionService {
    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Configuracion[]>  {
        return this.http.get<Configuracion[]>(APPCONFIG.BASE_URL+"/configuracion");
      }
     
      findById(id: number): Observable<Configuracion> {
        return this.http.get<Configuracion>(APPCONFIG.BASE_URL+"/configuracion/" + id);
      }
     
      guardar(item: Configuracion): Observable<Configuracion> {
        return this.http.post<Configuracion>(APPCONFIG.BASE_URL+"/configuracion",item);
      }
     
      actualizar(item: Configuracion): Observable<Configuracion> {
        return this.http.put<Configuracion>(APPCONFIG.BASE_URL+"/configuracion",item);
      }
}